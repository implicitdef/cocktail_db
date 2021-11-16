import React, { useCallback, useState } from "react";
import { Cocktail } from "../utils/types";

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
  searchResults,
  setSearchResults,
}: {
  cocktails: Cocktail[];
  searchResults: Cocktail[];
  setSearchResults: (res: Cocktail[]) => void;
}) {
  const [includeStr, includeStrOnChange] = useInputTextSetup();
  const [excludeStr, excludeStrOnChange] = useInputTextSetup();
  const [excludeNo, setExcludeNo] = useInputCheckboxSetup();
  const [excludeMaybe, setExcludeMaybe] = useInputCheckboxSetup();

  const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("@@@ on submit");
  }, []);

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

      {/* <select
        value={ingredientsFilterMode}
        onChange={(e) => setIngredientsFilterMode(e.target.value as FilterMode)}
      >
        <option value="all">All cocktails</option>
        <option value="only_yes">Only with Yes</option>
        <option value="yes_or_maybe">Only with Yes or Maybe</option>
      </select> */}
    </div>
  );
}
