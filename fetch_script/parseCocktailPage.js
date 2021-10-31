import { httpCallCached } from "./http.js";

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
  const doc = new DOMParser().parseFromString(html, "text/html");
  const name = cleanHtmlStr(doc.querySelector(".recipe-card h1").textContent);
  const imgSrc = doc
    .querySelector(".recipe-card .recipe-thumb img")
    .getAttribute("src");
  const desc = cleanHtmlStr(
    doc.querySelector(".recipe-card .recipe-description").textContent
  );
  const ingredientLis = doc.querySelectorAll(
    ".recipe-card .ingredient-list li"
  );
  const ingredients = [...ingredientLis].map((li) => {
    const amount = cleanHtmlStr(li.querySelector(".amount").textContent.trim());
    const ingredientName = cleanHtmlStr(
      li.querySelector(".ingredient").textContent.trim()
    );
    const alternateIngredients = li.querySelectorAll(".text-muted a");
    let alternateIngredientsNames = [];
    if (alternateIngredients && alternateIngredients.length) {
      alternateIngredientsNames = [...alternateIngredients].map((_) =>
        cleanHtmlStr(_.textContent.trim())
      );
    }
    return { amount, ingredientName, alternateIngredientsNames };
  });
  const instructions = doc.querySelector(
    ".recipe-card .recipe-instructions"
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
