import React, { useCallback } from "react";
import { Availability, AvailabilitySetter, Ingredient } from "../utils/types";
import { domain } from "../utils/utils";
import { AvailabilityLabel } from "./AvailabilityLabel";

export function IngredientWithAvailability({
  ingredientName,
  ingredientNameWithLinks,
  availability,
  setIngredientAvailability,
}: {
  ingredientName: string;
  ingredientNameWithLinks: Ingredient["ingredientNameWithLinks"];
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

  function buildIngredientUrl(href: string) {
    return `https://${domain}${href}`;
  }

  return (
    <span
      style={{
        textDecoration: availability === "no" ? "line-through" : "initial",
      }}
    >
      {ingredientNameWithLinks.map((part, i) => {
        const style = { margin: "0 2px" };
        if (typeof part === "string") {
          return (
            <span style={style} key={part + i}>
              {part}
            </span>
          );
        }
        return (
          <a
            style={style}
            key={part.text + i}
            href={buildIngredientUrl(part.href)}
          >
            {part.text}
          </a>
        );
      })}
      <AvailabilityLabel
        availability={availability}
        onClick={incrementAvailability}
      />
    </span>
  );
}
