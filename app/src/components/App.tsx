import React, { useCallback, useState } from "react";
import db from "../db.json";
import {
  persistIngredientsAvailability,
  readIngredientsAvailabilityFromPersistence,
} from "../utils/storage";
import { AvailabilitiesMap, Availability, Cocktail } from "../utils/types";
import { DISCREET } from "../utils/utils";
import { AllIngredients } from "./AllIngredients";
import { CocktailsSearch } from "./CocktailsSearch";

type Page = "cocktailssearch" | "allingredients";
/* eslint-disable jsx-a11y/anchor-is-valid */

function PageLink({
  target,
  page,
  label,
  setPage,
}: {
  target: Page;
  page: Page;
  label: string;
  setPage: (p: Page) => void;
}) {
  const goTo = useCallback(() => {
    setPage(target);
  }, [setPage, target]);

  const active = page === target;
  return (
    <a
      onClick={goTo}
      href="#"
      style={{
        margin: "0 10px",
        // textDecoration: active ? "none" : "underline",
        fontWeight: active ? "bold" : "normal",
      }}
    >
      {label}
    </a>
  );
}

function App() {
  const [page, setPage] = useState<Page>("cocktailssearch");
  const [ingredientsAvailability, setIngredientsAvailability] =
    useState<AvailabilitiesMap>(readIngredientsAvailabilityFromPersistence());

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
  const cocktails = db as Cocktail[];

  return (
    <div>
      <PageLink
        {...{
          page,
          target: "cocktailssearch",
          label: "Cocktails",
          setPage,
        }}
      />
      <PageLink
        {...{
          page,
          target: "allingredients",
          label: "Ingredients",
          setPage,
        }}
      />
      {page === "cocktailssearch" ? (
        <CocktailsSearch
          {...{ cocktails, setIngredientAvailability, ingredientsAvailability }}
        />
      ) : (
        <AllIngredients
          {...{ cocktails, setIngredientAvailability, ingredientsAvailability }}
        />
      )}
    </div>
  );
}
if (DISCREET) {
  document.body.style.background = "white";
}

export default App;
