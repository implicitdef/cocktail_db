import React, { useCallback, useState } from "react";
import {
  persistIngredientsAvailability,
  readIngredientsAvailabilityFromPersistence,
} from "../utils/storage";
import { AvailabilitiesMap, Cocktail, FilterMode } from "../utils/types";
import { SettingsOverlay } from "./SettingsOverlay";
import { CocktailsTable } from "./variousComponents";

export function BigAppWrapper({ cocktails }: { cocktails: Cocktail[] }) {
  const [ingredientsAvailability, setIngredientsAvailability] =
    useState<AvailabilitiesMap>(readIngredientsAvailabilityFromPersistence());
  const [ingredientsFilterMode, setIngredientsFilterMode] =
    useState<FilterMode>("all");

  const setIngredientAvailability = useCallback(
    (ingredientName, availability) => {
      const newMap = {
        ...ingredientsAvailability,
        [ingredientName]: availability,
      };
      setIngredientsAvailability(newMap);
      setTimeout(() => {
        persistIngredientsAvailability(newMap);
      }, 50);
    },
    [ingredientsAvailability]
  );

  return (
    <div>
      <SettingsOverlay
        {...{ ingredientsFilterMode, setIngredientsFilterMode }}
      />
      <CocktailsTable
        cocktails={cocktails}
        {...{
          ingredientsAvailability,
          setIngredientAvailability,
          ingredientsFilterMode,
          setIngredientsFilterMode,
        }}
      />
    </div>
  );
}
