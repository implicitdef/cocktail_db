import React, { useCallback, useState } from "react";
import { AvailabilitiesMap, Cocktail } from "../utils/types";
import { flattenIngredientName } from "../utils/utils";

function useInputTextSetup() {
  const [value, setValue] = useState<string>("");
  const onChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);
  return [value, onChange] as const;
}

function useInputCheckboxSetup() {
  const [value, setValue] = useState<boolean>(false);
  const onChange = useCallback((e) => {
    setValue(e.target.checked);
  }, []);
  return [value, onChange] as const;
}

function parseSpacedStr(s: string) {
  return s
    .trim()
    .toLowerCase()
    .split(" ")
    .filter((_) => _.trim().length);
}

export function SettingsOverlay({
  cocktails,
  setSearchResults,
  ingredientsAvailability,
}: {
  cocktails: Cocktail[];
  setSearchResults: (res: Cocktail[]) => void;
  ingredientsAvailability: AvailabilitiesMap;
}) {
  const [includeStr, includeStrOnChange] = useInputTextSetup();
  const [excludeStr, excludeStrOnChange] = useInputTextSetup();
  const [excludeNo, setExcludeNo] = useInputCheckboxSetup();
  const [excludeMaybe, setExcludeMaybe] = useInputCheckboxSetup();

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const includes = parseSpacedStr(includeStr);
      const excludes = parseSpacedStr(excludeStr);
      setSearchResults(
        cocktails.filter(({ ingredients }) => {
          const ingredientNames = ingredients.map((_) =>
            flattenIngredientName(_.ingredientNameWithLinks)
          );

          if (
            excludeNo &&
            ingredientNames.some(
              (name) => ingredientsAvailability[name] === "no"
            )
          ) {
            return false;
          }
          if (
            excludeMaybe &&
            ingredientNames.some(
              (name) => ingredientsAvailability[name] === "maybe"
            )
          ) {
            return false;
          }
          if (
            includes.length &&
            !includes.every((word) =>
              ingredientNames.some((name) => name.toLowerCase().includes(word))
            )
          ) {
            return false;
          }
          if (
            excludes.length &&
            !excludes.every((word) =>
              ingredientNames.every(
                (name) => !name.toLowerCase().includes(word)
              )
            )
          ) {
            return false;
          }
          return true;
        })
      );
    },
    [
      ingredientsAvailability,
      cocktails,
      excludeMaybe,
      excludeNo,
      excludeStr,
      includeStr,
      setSearchResults,
    ]
  );

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

      <form onSubmit={onSubmit}>
        <input
          type="text"
          onChange={includeStrOnChange}
          value={includeStr}
          placeholder="hello demo"
        />

        <input
          type="text"
          onChange={excludeStrOnChange}
          value={excludeStr}
          placeholder="hello demo"
        />

        <label htmlFor="exclude_no">exclude the "no"</label>
        <input
          type="checkbox"
          checked={excludeNo}
          onChange={setExcludeNo}
          id="exclude_no"
        />

        <label htmlFor="exclude_maybe">exclude the "maybe"</label>
        <input
          type="checkbox"
          checked={excludeMaybe}
          onChange={setExcludeMaybe}
          id="exclude_maybe"
        />

        <button type="submit">Search</button>
      </form>
    </div>
  );
}
