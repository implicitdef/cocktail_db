import React from "react";
import { Availability } from "../utils/types";

export function AvailabilityLabel({
  availability,
  onClick = () => {},
}: {
  availability: Availability | null;
  onClick?: () => void;
}) {
  function translateAvailabilityAsColor() {
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

  return (
    <span
      style={{
        padding: "0 5px",
        margin: "0 5px",
        borderRadius: "5px",
        color: "white",
        cursor: "pointer",
        backgroundColor: translateAvailabilityAsColor(),
      }}
      onClick={onClick}
    >
      {availability || "???"}
    </span>
  );
}
