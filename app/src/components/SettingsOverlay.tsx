import React, { useCallback, useState } from "react";
import { performSearch } from "../utils/searchLogic";
import { AvailabilitiesMap, Cocktail } from "../utils/types";

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
      setSearchResults(
        performSearch({
          cocktails,
          ingredientsAvailability,
          searchCriteria: {
            includeStr,
            excludeStr,
            excludeNo,
            excludeMaybe,
          },
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

      <form
        style={{
          display: "flex",
          flexFlow: "column",
          gap: "10px",
          minWidth: "400px",
        }}
        onSubmit={onSubmit}
      >
        <input
          type="text"
          onChange={includeStrOnChange}
          value={includeStr}
          placeholder="required ingredients (use spaces as a delimiter)"
        />

        <input
          type="text"
          onChange={excludeStrOnChange}
          value={excludeStr}
          placeholder="ingredients to exclude (use spaces as a delimiter)"
        />

        <div>
          <input
            type="checkbox"
            checked={excludeNo}
            onChange={setExcludeNo}
            id="exclude_no"
          />
          <label htmlFor="exclude_no">
            Exclude cocktails with ingredients marked "no"
          </label>
        </div>

        <div>
          <input
            type="checkbox"
            checked={excludeMaybe}
            onChange={setExcludeMaybe}
            id="exclude_maybe"
          />
          <label htmlFor="exclude_maybe">
            Exclude cocktails with ingredients marked "maybe"
          </label>
        </div>

        <button type="submit">Search</button>
      </form>
    </div>
  );
}
