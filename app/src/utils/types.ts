export interface Ingredient {
  amount: string;
  ingredientNameWithLinks: (string | { href: string; text: string })[];
  alternateIngredientsNames: string[];
}
export interface Cocktail {
  url: string;
  imgSrc: string;
  name: string;
  desc: string;
  ingredients: Ingredient[];
  instructions: string;
}

export type Availability = "no" | "maybe" | "yes";
export type AvailabilitySetter = (
  ingredient: string,
  availability: Availability
) => void;

export interface AvailabilitiesMap {
  [ingredient: string]: Availability;
}
