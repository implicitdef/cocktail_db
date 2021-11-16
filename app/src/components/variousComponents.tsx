import React from "react";
import {
  AvailabilitiesMap,
  Availability,
  AvailabilitySetter,
  Cocktail,
  FilterMode,
} from "../utils/types";
import { flattenIngredientName } from "../utils/utils";
import { CocktailCard } from "./CocktailCard";

export function CocktailsTable({
  cocktails,
  ingredientsAvailability,
  setIngredientAvailability,
  ingredientsFilterMode,
}: {
  cocktails: Cocktail[];
  ingredientsAvailability: AvailabilitiesMap;
  setIngredientAvailability: AvailabilitySetter;
  ingredientsFilterMode: FilterMode;
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
      {cocktails
        .filter(({ ingredients }) => {
          if (ingredientsFilterMode === "all") return true;
          return ingredients.every(({ ingredientNameWithLinks }) => {
            const availability: Availability | null =
              ingredientsAvailability[
                flattenIngredientName(ingredientNameWithLinks)
              ] || null;
            return (
              availability === null ||
              availability === "yes" ||
              (availability === "maybe" &&
                ingredientsFilterMode === "yes_or_maybe")
            );
          });
        })
        .map((cocktail) => {
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
