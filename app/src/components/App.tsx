import React from "react";
import db from "../db.json";
import { Cocktail } from "../utils/types";
import { BigAppWrapper } from "./variousComponents";

function App() {
  return <BigAppWrapper cocktails={db as Cocktail[]} />;
}

export default App;
