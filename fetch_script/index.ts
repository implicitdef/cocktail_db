import { fetchAndParseAllCocktails, Cocktail } from "./lib.ts";

export function writeCocktailsToJsFile(cocktails: Cocktail[]): void {
  const file = "./js/db.js";
  console.log(`Writing to ${file}`);
  Deno.writeTextFileSync(file, `window.DB = ${JSON.stringify(cocktails)}`, {});
}

async function something() {
  const cocktails = await fetchAndParseAllCocktails();

  console.log("nb cocktails", cocktails.length);
  writeCocktailsToJsFile(cocktails);
}

something();
