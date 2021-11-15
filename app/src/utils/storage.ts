import { AvailabilitiesMap } from "./types";

export function persistIngredientsAvailability(
  ingredientsAvailability: AvailabilitiesMap
) {
  localStorage.setItem(
    "availabilities",
    JSON.stringify(ingredientsAvailability)
  );
}

export function readIngredientsAvailabilityFromPersistence(): AvailabilitiesMap {
  return JSON.parse(localStorage.getItem("availabilities") || "{}");
}

