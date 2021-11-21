import React from "react";
import {
  AvailabilitiesMap,
  Availability,
  Cocktail,
  Ingredient,
  IngredientName,
} from "../utils/types";
import { flattenIngredientName } from "../utils/utils";
import { IngredientWithAvailability } from "./IngredientWithAvailability";

function buildList(cocktails: Cocktail[]): IngredientName[] {
  const frequenciesMap: {
    [jsonStr: string]: number;
  } = {};
  cocktails.forEach((c) =>
    c.ingredients.forEach((i) => {
      const jsonStr = JSON.stringify(i.ingredientNameWithLinks);
      frequenciesMap[jsonStr] = (frequenciesMap[jsonStr] || 0) + 1;
    })
  );
  const allNames = Object.keys(frequenciesMap);
  return allNames
    .sort((a, b) => frequenciesMap[b] - frequenciesMap[a])
    .map((_) => JSON.parse(_));
}

function listAllIngredientsSortedByFrequency(cocktails: Cocktail[]): string[] {
  const frequenciesMap: {
    [k: string]: number;
  } = {};
  cocktails.forEach((c) =>
    c.ingredients.forEach((i) => {
      const name = flattenIngredientName(i.ingredientNameWithLinks);
      frequenciesMap[name] = (frequenciesMap[name] || 0) + 1;
    })
  );
  const allNames = Object.keys(frequenciesMap);
  return allNames.sort((a, b) => frequenciesMap[b] - frequenciesMap[a]);
}

export function AllIngredients({
  cocktails,
  setIngredientAvailability,
  ingredientsAvailability,
}: {
  cocktails: Cocktail[];
  setIngredientAvailability: (
    ingredientName: string,
    availability: Availability
  ) => void;
  ingredientsAvailability: AvailabilitiesMap;
}) {
  const names = buildList(cocktails);

  return (
    <ul>
      {names.map((name) => {
        const flattenedName = flattenIngredientName(name);
        return (
          <li key={flattenedName}>
            <IngredientWithAvailability
              ingredientName={flattenedName}
              ingredientNameWithLinks={name}
              availability={ingredientsAvailability[flattenedName]}
              setIngredientAvailability={setIngredientAvailability}
            />
          </li>
        );
      })}
    </ul>
  );
}
