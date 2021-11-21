import React, { useCallback, useState } from "react";
import db from "../db.json";
import {
  persistIngredientsAvailability,
  readIngredientsAvailabilityFromPersistence,
} from "../utils/storage";
import { AvailabilitiesMap, Availability, Cocktail } from "../utils/types";
import { DISCREET } from "../utils/utils";
import { CocktailsSearch } from "./CocktailsSearch";

function App() {
  const [page, setPage] = useState<"cocktailssearch" | "allingredients">(
    "cocktailssearch"
  );
  const [ingredientsAvailability, setIngredientsAvailability] =
    useState<AvailabilitiesMap>(readIngredientsAvailabilityFromPersistence());

  const goToCocktailsSearch = useCallback(() => {
    setPage("cocktailssearch");
  }, [setPage]);
  const goToAllIngredients = useCallback(() => {
    setPage("allingredients");
  }, [setPage]);

  const setIngredientAvailability = useCallback(
    (ingredientName: string, availability: Availability) => {
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
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a onClick={goToCocktailsSearch} href="#">
        cocktailssearch
      </a>{" "}
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a onClick={goToAllIngredients} href="#">
        all ingredients
      </a>
      {page === "cocktailssearch" ? (
        <CocktailsSearch
          cocktails={db as Cocktail[]}
          {...{ setIngredientAvailability, ingredientsAvailability }}
        />
      ) : (
        ""
      )}
    </div>
  );
}
if (DISCREET) {
  document.body.style.background = "white";
}

export default App;
