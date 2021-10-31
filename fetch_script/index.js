import { fetchAndParseAllCocktails } from "./lib.js";
import { writeFileSync } from "fs";
export function writeCocktailsToJsFile(cocktails) {
  const file = "../app/src/db.json";
  console.log(`Writing to ${file}`);
  writeFileSync(file, JSON.stringify(cocktails));
}

async function something() {
  const cocktails = await fetchAndParseAllCocktails();

  console.log("nb cocktails", cocktails.length);
  writeCocktailsToJsFile(cocktails);
}

something();
