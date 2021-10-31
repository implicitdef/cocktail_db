import { httpCallCached } from "./http.js";
import { parseCocktailPage } from "./parseCocktailPage.js";
import { domain, uniq } from "./utils.js";
import cheerio from "cheerio";

/*
interface Cocktail {
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
*/

const hardcodedCocktailsUrls = [`https://${domain}/drinks/maple-leaf/`];

export async function buildLinksOfAllCocktails() {
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

  return uniq([
    ...(
      await Promise.all(
        categories.map(async (categoryUrl) => {
          const html = await httpCallCached(categoryUrl);
          const $ = cheerio.load(html);
          console.log(`Parsing cocktail links from category ${categoryUrl}`);
          const urls = $(".drink-chip a")
            .map(function () {
              return $(this).attr("href");
            })
            .get();
          return urls;
        })
      )
    ).flat(),
    // on ajoute des cocktails hardcodés, qui ne sont pas accessibles en cherchant par catégorie
    // à terme il faudra essayer de crawler le site différemment pour trouver vraiment tous les cocktails
    ...hardcodedCocktailsUrls,
  ]);
}

// Returns an array of cocktails
export async function fetchAndParseAllCocktails() {
  const links = await buildLinksOfAllCocktails();
  return await Promise.all(
    links.map(async (link) => {
      return await parseCocktailPage(link);
    })
  );
}
