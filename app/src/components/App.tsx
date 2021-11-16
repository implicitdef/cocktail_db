import React from "react";
import db from "../db.json";
import { Cocktail } from "../utils/types";
import { DISCREET } from "../utils/utils";
import { BigAppWrapper } from "./BigAppWrapper";

function App() {
  return <BigAppWrapper cocktails={db as Cocktail[]} />;
}
if (DISCREET) {
  document.body.style.background = "white";
}

export default App;
