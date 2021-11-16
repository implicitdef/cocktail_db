import React from "react";
import db from "../db.json";
import { Cocktail } from "../utils/types";
import { DISCREET } from "../utils/utils";
import { BigAppWrapper } from "./BigAppWrapper";

function App() {
  return (
    <div style={{ padding: "30px" }}>
      {DISCREET || <h1>Cocktails database</h1>}
      <BigAppWrapper cocktails={db as Cocktail[]} />
    </div>
  );
}
if (DISCREET) {
  document.body.style.background = "white";
}

export default App;
