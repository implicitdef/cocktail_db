import React, { useCallback } from "react";
import { Availability, AvailabilitySetter } from "../utils/types";
import { domain } from "../utils/utils";

export function IngredientWithAvailability({
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
