import { fetchAndParseAllCocktails, Cocktail } from "./lib.ts";

export function writeCocktailsToJsFile(cocktails: Cocktail[]): void {
  const file = "./app/src/db.json";
  console.log(`Writing to ${file}`);
  Deno.writeTextFileSync(file, JSON.stringify(cocktails), {});
}

async function something() {
  const cocktails = await fetchAndParseAllCocktails();

  console.log("nb cocktails", cocktails.length);
  writeCocktailsToJsFile(cocktails);
}

something();
