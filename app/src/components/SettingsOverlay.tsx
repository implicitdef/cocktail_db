import React from "react";
import { FilterMode, FilterModeSetter } from "../utils/types";

export function SettingsOverlay({
  ingredientsFilterMode,
  setIngredientsFilterMode,
}: {
  ingredientsFilterMode: FilterMode;
  setIngredientsFilterMode: FilterModeSetter;
}) {
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

      <h3>Filter mode</h3>

      <select
        value={ingredientsFilterMode}
        onChange={(e) => setIngredientsFilterMode(e.target.value as FilterMode)}
      >
        <option value="all">All cocktails</option>
        <option value="only_yes">Only with Yes</option>
        <option value="yes_or_maybe">Only with Yes or Maybe</option>
      </select>
    </div>
  );
}
