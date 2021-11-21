import React, { useCallback, useState } from "react";
import db from "../db.json";
import { Cocktail } from "../utils/types";
import { DISCREET } from "../utils/utils";
import { CocktailsSearch } from "./CocktailsSearch";

function App() {
  const [page, setPage] = useState<"cocktailssearch" | "allingredients">(
    "cocktailssearch"
  );

  const goToCocktailsSearch = useCallback(() => {
    setPage("cocktailssearch");
  }, [setPage]);
  const goToAllIngredients = useCallback(() => {
    setPage("allingredients");
  }, [setPage]);

  



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
        <CocktailsSearch cocktails={db as Cocktail[]} />
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
