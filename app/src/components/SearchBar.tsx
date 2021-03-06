import React, { useCallback, useState } from "react";
import { performSearch } from "../utils/searchLogic";
import { AvailabilitiesMap, Cocktail } from "../utils/types";
import { DISCREET } from "../utils/utils";

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

export function SearchBar({
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
        border: "2px dashed gray",
        padding: "10px",
        paddingTop: "0",
        margin: "8px",
        top: "10px",
        maxWidth: "400px",
      }}
    >
      {DISCREET || <h5>Search filters</h5>}

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
