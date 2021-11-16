import React from "react";
import {
  AvailabilitiesMap,
  AvailabilitySetter,
  Cocktail,
} from "../utils/types";
import { domain, flattenIngredientName } from "../utils/utils";
import { Alternatives } from "./Alternatives";
import { IngredientWithAvailability } from "./IngredientWithAvailability";

export function CocktailCard({
  cocktail,
  ingredientsAvailability,
  setIngredientAvailability,
}: {
  cocktail: Cocktail;
  ingredientsAvailability: AvailabilitiesMap;
  setIngredientAvailability: AvailabilitySetter;
}) {
  return (
    <div
      style={{
        maxWidth: "500px",
        background: "#FFE",
        padding: "5px",
        margin: "5px",
      }}
    >
      {/* <img
        style={{ height: "4rem", float: "right" }}
        src={`https://${domain}/${cocktail.imgSrc}`}
        alt=""
      /> */}
      <h4 style={{ margin: 0 }}>
        {cocktail.name}
        <a
          style={{ fontSize: "0.9rem", marginLeft: "5px" }}
          href={`https://${domain}${cocktail.url}`}
          target="_blank"
          rel="noreferrer"
        >
          link
        </a>
      </h4>

      <ul>
        {cocktail.ingredients.map(
          ({ amount, ingredientNameWithLinks, alternateIngredientsNames }) => {
            const ingredientName = flattenIngredientName(
              ingredientNameWithLinks
            );
            return (
              <li key={ingredientName}>
                {amount}{" "}
                <IngredientWithAvailability
                  ingredientName={ingredientName}
                  ingredientNameWithLinks={ingredientNameWithLinks}
                  availability={ingredientsAvailability[ingredientName]}
                  setIngredientAvailability={setIngredientAvailability}
                />
                <Alternatives alternatives={alternateIngredientsNames} />
              </li>
            );
          }
        )}
      </ul>
    </div>
  );
}
