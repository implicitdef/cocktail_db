import React from "react";
import db from "../db.json";
import { Cocktail } from "../utils/types";
import { BigAppWrapper } from "./BigAppWrapper";

function App() {
  return (
    <div style={{ padding: "30px" }}>
      <h1>Cocktails database</h1>
      <BigAppWrapper cocktails={db as Cocktail[]} />
    </div>
  );
}

export default App;
