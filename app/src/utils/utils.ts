import { Availability } from "./types";

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

export const domain = "cocktailpa" + "rtyapp.com";
