import React, { useState } from "react";
import { AvailabilitiesMap, Availability, Cocktail } from "../utils/types";
import { CocktailsTable } from "./CocktailsTable";
import { SearchBar } from "./SearchBar";

export function CocktailsSearch({
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
  const [searchResults, setSearchResults] = useState<Cocktail[]>(cocktails);

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
