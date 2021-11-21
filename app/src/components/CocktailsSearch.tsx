import React, { useCallback, useState } from "react";
import {
  persistIngredientsAvailability,
  readIngredientsAvailabilityFromPersistence,
} from "../utils/storage";
import { AvailabilitiesMap, Cocktail } from "../utils/types";
import { SearchBar } from "./SearchBar";
import { CocktailsTable } from "./CocktailsTable";

export function CocktailsSearch({ cocktails }: { cocktails: Cocktail[] }) {
  const [ingredientsAvailability, setIngredientsAvailability] =
    useState<AvailabilitiesMap>(readIngredientsAvailabilityFromPersistence());
  const [searchResults, setSearchResults] = useState<Cocktail[]>(cocktails);

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
      <SearchBar
        {...{ cocktails, ingredientsAvailability, setSearchResults }}
      />
      <CocktailsTable
        cocktails={searchResults}
        {...{
          ingredientsAvailability,
          setIngredientAvailability,
        }}
      />
    </div>
  );
}
