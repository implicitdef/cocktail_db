import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";
import { redisGet, redisSet } from "./redisCache.ts";
import { throttle } from "./throttle.ts";

const domain = "cocktailpa" + "rtyapp.com";
export interface Cocktail {
  url: string;
  imgSrc: string;
  name: string;
  desc: string;
  ingredients: {
    amount: string;
    ingredientName: string;
    alternateIngredientsNames: string[];
  }[];
  instructions: string;
}

function cleanHtmlStr(s: string): string {
  return s.replace(/\s+/, " ");
}

export async function parseCocktail(url: string): Promise<Cocktail> {
  const html = await httpCallCached(url);
  console.log(`Parsing cocktail ${url}`);
  const doc = new DOMParser().parseFromString(html, "text/html") as any;
  const name = cleanHtmlStr(
    (doc.querySelector(".recipe-card h1") as any).textContent
  );
  const imgSrc = (
    doc.querySelector(".recipe-card .recipe-thumb img") as any
  ).getAttribute("src");
  const desc = cleanHtmlStr(
    (doc.querySelector(".recipe-card .recipe-description") as any).textContent
  );
  const ingredientLis = doc.querySelectorAll(
    ".recipe-card .ingredient-list li"
  ) as any;
  const ingredients = [...ingredientLis].map((li: any) => {
    const amount = cleanHtmlStr(
      (li.querySelector(".amount") as any).textContent.trim()
    );
    const ingredientName = cleanHtmlStr(
      (li.querySelector(".ingredient") as any).textContent.trim()
    );
    const alternateIngredients = li.querySelectorAll(".text-muted a") as any;
    let alternateIngredientsNames: string[] = [];
    if (alternateIngredients && alternateIngredients.length) {
      alternateIngredientsNames = [...alternateIngredients].map((_) =>
        cleanHtmlStr(_.textContent.trim())
      );
    }
    return { amount, ingredientName, alternateIngredientsNames };
  });
  const instructions = (
    doc.querySelector(".recipe-card .recipe-instructions") as any
  ).textContent;
  return {
    url: url.replace(/^https:\/\/[^\/]*\//, "/"),
    imgSrc,
    name,
    desc,
    ingredients,
    instructions,
  };
}

function uniq<A>(arr: A[]): A[] {
  return [...new Set(arr)];
}

export async function buildLinksOfAllCocktails(): Promise<string[]> {
  const categories = [
    `https://${domain}/drink-category/creamy-cocktails/`,
    `https://${domain}/drink-category/highball-cocktails/`,
    `https://${domain}/drink-category/hot-cocktails/`,
    `https://${domain}/drink-category/fruit-herb-cocktails/`,
    `https://${domain}/drink-category/low-proof-cocktails/`,
    `https://${domain}/drink-category/savory-cocktails/`,
    `https://${domain}/drink-category/simple-cocktails/`,
    `https://${domain}/drink-category/sour-cocktails/`,
    `https://${domain}/drink-category/sparkling-cocktails/`,
    `https://${domain}/drink-category/spirit-forward-cocktails/`,
    `https://${domain}/drink-category/tropical-cocktails/`,
  ];

  return uniq(
    (
      await Promise.all(
        categories.map(async (categoryUrl) => {
          const html = await httpCallCached(categoryUrl);
          const doc = new DOMParser().parseFromString(html, "text/html");
          if (doc) {
            console.log(`Parsing cocktail links from category ${categoryUrl}`);
            const links = doc.querySelectorAll(".drink-chip a");
            const urls: string[] = [...links].map((link) => {
              return (link as any).getAttribute("href");
            });
            return urls;
          }
          throw new Error(`cannot parse doc Dom from ${categoryUrl}`);
        })
      )
    ).flat()
  );
}

export async function httpCallCached(url: string): Promise<string> {
  return throttle(async () => {
    const cacheKey = `http:${url}`;
    const cache = await redisGet(cacheKey);
    if (cache) return cache;
    console.log(">>>>>", url);
    const res = await fetch(url);
    console.log("<<<", res.status);
    if (res.status !== 200) {
      throw new Error("not 200 on " + url + "" + res.status);
    }
    const text = await res.text();
    redisSet(cacheKey, text);
    return text;
  });
}

export async function fetchAndParseAllCocktails(): Promise<Cocktail[]> {
  const links = await buildLinksOfAllCocktails();
  return await Promise.all(
    links.map(async (link) => {
      return await parseCocktail(link);
    })
  );
}
