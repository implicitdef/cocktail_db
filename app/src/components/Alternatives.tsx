import React from "react";

export function Alternatives({ alternatives }: { alternatives: string[] }) {
  if (alternatives.length) {
    return (
      <span style={{ color: "grey" }}> (or {alternatives.join("/")})</span>
    );
  }
  return null;
}
