import React, { useCallback, useState } from "react";
import {
  AvailabilitiesMap,
  Availability,
  AvailabilitySetter,
  Cocktail,
  FilterMode,
  FilterModeSetter,
} from "../utils/types";
import { domain } from "../utils/utils";

export function Alternatives({ alternatives }: { alternatives: string[] }) {
  if (alternatives.length) {
    return (
      <span style={{ color: "grey" }}> (or {alternatives.join("/")})</span>
    );
  }
  return null;
}

function CocktailCard({
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
      <img
        style={{ height: "4rem", float: "right" }}
        src={`https://${domain}/${cocktail.imgSrc}`}
        alt=""
      />
      <h2 style={{ margin: 0 }}>
        {cocktail.name}
        <a
          style={{ fontSize: "0.9rem", marginLeft: "5px" }}
          href={`https://${domain}${cocktail.url}`}
          target="_blank"
          rel="noreferrer"
        >
          link
        </a>
      </h2>

      <ul>
        {cocktail.ingredients.map(
          ({ amount, ingredientName, alternateIngredientsNames }) => {
            return (
              <li key={ingredientName}>
                {amount}{" "}
                <IngredientWithAvailability
                  ingredientName={ingredientName}
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

function IngredientWithAvailability({
  ingredientName,
  availability,
  setIngredientAvailability,
}: {
  ingredientName: string;
  availability: Availability;
  setIngredientAvailability: AvailabilitySetter;
}) {
  function translateAvailabilityAsColor() {
    switch (availability) {
      case "no":
        return "red";
      case "maybe":
        return "orange";
      case "yes":
        return "green";
      case null:
      case undefined:
        return "gray";
    }
  }

  const incrementAvailability = useCallback(() => {
    const newAvailability =
      availability === "no" ? "maybe" : availability === "maybe" ? "yes" : "no";
    setIngredientAvailability(ingredientName, newAvailability);
  }, [ingredientName, availability, setIngredientAvailability]);

  function buildIngredientUrl() {
    return `https://${domain}/ingredients/${ingredientName.replace(" ", "-")}`;
  }

  return (
    <span>
      <a
        href={buildIngredientUrl()}
        style={{
          textDecoration: availability === "no" ? "line-through" : "initial",
        }}
      >
        {ingredientName}
      </a>
      <span
        style={{
          padding: "0 5px",
          margin: "0 5px",
          borderRadius: "5px",
          color: "white",
          cursor: "pointer",
          backgroundColor: translateAvailabilityAsColor(),
        }}
        onClick={incrementAvailability}
      >
        {availability || "???"}
      </span>
    </span>
  );
}

function SettingsOverlay({
  ingredientsAvailability,
  setIngredientAvailability,
  ingredientsFilterMode,
  setIngredientsFilterMode,
}: {
  ingredientsAvailability: AvailabilitiesMap;
  setIngredientAvailability: AvailabilitySetter;
  ingredientsFilterMode: FilterMode;
  setIngredientsFilterMode: FilterModeSetter;
}) {
  return (
    <div
      style={{
        background: "lightblue",
        padding: "10px",
        position: "fixed",
        top: "10px",
        right: "10px",
      }}
    >
      <h2>Settings</h2>

      <h3>Filter mode</h3>

      <select
        value={ingredientsFilterMode}
        onChange={(e) => setIngredientsFilterMode(e.target.value as FilterMode)}
      >
        <option value="all">All cocktails</option>
        <option value="only_yes">Only with Yes</option>
        <option value="yes_or_maybe">Only with Yes or Maybe</option>
      </select>

      <h3>Ingredients available or not</h3>
      {Object.entries(ingredientsAvailability).map(
        ([ingredientName, availability]) => {
          return (
            <p key={ingredientName}>
              <IngredientWithAvailability
                ingredientName={ingredientName}
                availability={availability}
                setIngredientAvailability={setIngredientAvailability}
              />
            </p>
          );
        }
      )}
    </div>
  );
}

function CocktailsTable({
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
    <div>
      {cocktails
        .filter(({ ingredients }) => {
          if (ingredientsFilterMode === "all") return true;
          return ingredients.every(({ ingredientName }) => {
            const availability: Availability | null =
              ingredientsAvailability[ingredientName] || null;
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

function persistIngredientsAvailability(
  ingredientsAvailability: AvailabilitiesMap
) {
  localStorage.setItem(
    "availabilities",
    JSON.stringify(ingredientsAvailability)
  );
}

function readIngredientsAvailabilityFromPersistence(): AvailabilitiesMap {
  return JSON.parse(localStorage.getItem("availabilities") || "{}");
}

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

  const props = {
    ingredientsAvailability,
    setIngredientAvailability,
    ingredientsFilterMode,
    setIngredientsFilterMode,
  };
  return (
    <div>
      <SettingsOverlay {...props} />
      <CocktailsTable cocktails={cocktails} {...props} />
    </div>
  );
}
