import React from "react";
import {
  AvailabilitiesMap,
  AvailabilitySetter,
  Cocktail,
} from "../utils/types";
import { CocktailCard } from "./CocktailCard";

export function CocktailsTable({
  cocktails,
  ingredientsAvailability,
  setIngredientAvailability,
}: {
  cocktails: Cocktail[];
  ingredientsAvailability: AvailabilitiesMap;
  setIngredientAvailability: AvailabilitySetter;
}) {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexFlow: "row wrap",
        justifyContent: "flex-start",
      }}
    >
      {cocktails.map((cocktail) => {
        return (
          <CocktailCard
            key={cocktail.name}
            cocktail={cocktail}
            ingredientsAvailability={ingredientsAvailability}
            setIngredientAvailability={setIngredientAvailability}
          />
        );
      })}
    </div>
  );
}
