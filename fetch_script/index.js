import { fetchAndParseAllCocktails } from "./lib.js";

export function writeCocktailsToJsFile(cocktails) {
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
