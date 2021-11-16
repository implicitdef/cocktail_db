import { Availability, Ingredient } from "./types";

export const DISCREET = false;

export function translateAvailabilityAsColor(availability: Availability) {
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

function reverse(s: string) {
  return s.split("").reverse().join("");
}

// eslint-disable-next-line no-useless-concat
export const domain = reverse("apliatkcoc") + "rtyapp.com";

export function flattenIngredientName(
  ingredientNameWithLinks: Ingredient["ingredientNameWithLinks"]
) {
  return ingredientNameWithLinks
    .map((part) => {
      if (typeof part === "string") {
        return part;
      } else {
        return part.text;
      }
    })
    .join(" ");
}
