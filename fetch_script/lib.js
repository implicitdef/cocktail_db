import { parseCocktailPage } from "./parseCocktailPage.js";
import { domain, uniq } from "./utils.js";

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
          const html = await httpCall(categoryUrl);
          const doc = new DOMParser().parseFromString(html, "text/html");
          if (doc) {
            console.log(`Parsing cocktail links from category ${categoryUrl}`);
            const links = doc.querySelectorAll(".drink-chip a");
            const urls = [...links].map((link) => {
              return link.getAttribute("href");
            });
            return urls;
          }
          throw new Error(`cannot parse doc Dom from ${categoryUrl}`);
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
