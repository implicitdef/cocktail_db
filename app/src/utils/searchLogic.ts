import { AvailabilitiesMap, Cocktail } from "./types";
import { flattenIngredientName } from "./utils";

function parseSpacedStr(s: string) {
  return s
    .trim()
    .toLowerCase()
    .split(" ")
    .filter((_) => _.trim().length);
}

export function performSearch({
  cocktails,
  ingredientsAvailability,
  searchCriteria,
}: {
  cocktails: Cocktail[];
  ingredientsAvailability: AvailabilitiesMap;
  searchCriteria: {
    includeStr: string;
    excludeStr: string;
    excludeNo: boolean;
    excludeMaybe: boolean;
  };
}): Cocktail[] {
  const { includeStr, excludeStr, excludeNo, excludeMaybe } = searchCriteria;
  const includes = parseSpacedStr(includeStr);
  const excludes = parseSpacedStr(excludeStr);
  return cocktails.filter(({ ingredients }) => {
    const ingredientNames = ingredients.map((_) =>
      flattenIngredientName(_.ingredientNameWithLinks)
    );

    if (
      excludeNo &&
      ingredientNames.some((name) => ingredientsAvailability[name] === "no")
    ) {
      return false;
    }
    if (
      excludeMaybe &&
      ingredientNames.some((name) => ingredientsAvailability[name] === "maybe")
    ) {
      return false;
    }
    if (
      includes.length &&
      !includes.every((word) =>
        ingredientNames.some((name) => name.toLowerCase().includes(word))
      )
    ) {
      return false;
    }
    if (
      excludes.length &&
      !excludes.every((word) =>
        ingredientNames.every((name) => !name.toLowerCase().includes(word))
      )
    ) {
      return false;
    }
    return true;
  });
}
