export interface Cocktail {
  url: string;
  imgSrc: string;
  name: string;
  desc: string;
  ingredients: {
    amount: string;
    ingredientName: string;
    alternateIngredientsNames: string[];
  }[];
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

export type FilterMode = "all" | "only_yes" | "yes_or_maybe";
export type FilterModeSetter = (f: FilterMode) => void;
