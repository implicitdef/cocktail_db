import { httpCallCached } from "./http.js";
import cheerio from "cheerio";
import { cleanHtmlStr } from "./utils.js";

/*

Return an object like this :

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
export async function parseCocktailPage(url) {
  const html = await httpCallCached(url);
  console.log(`Parsing cocktail ${url}`);
  const $ = cheerio.load(html);
  const name = cleanHtmlStr($(".recipe-card h1").text());
  const imgSrc = $(".recipe-card .recipe-thumb img").attr("src");
  const desc = cleanHtmlStr($(".recipe-card .recipe-description").text());
  const ingredients = $(".recipe-card .ingredient-list li")
    .map(function () {
      const li = $(this);
      const amount = cleanHtmlStr($(".amount", li).text().trim());
      const ingredientName = cleanHtmlStr($(".ingredient", li).text().trim());
      const alternateIngredients = $(".text-muted a", li);
      let alternateIngredientsNames = [];
      if (alternateIngredients && alternateIngredients.length) {
        alternateIngredientsNames = alternateIngredients
          .map(function () {
            return cleanHtmlStr($(this).text().trim());
          })
          .get();
      }
      return { amount, ingredientName, alternateIngredientsNames };
    })
    .get();
  const instructions = cleanHtmlStr(
    $(".recipe-card .recipe-instructions").text()
  );
  return {
    url: url.replace(/^https:\/\/[^\/]*\//, "/"),
    imgSrc,
    name,
    desc,
    ingredients,
    instructions,
  };
}
