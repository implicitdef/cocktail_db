const e = React.createElement;

const domain = "cocktailpa" + "rtyapp.com";

function Alternatives({ alternatives }) {
  if (alternatives.length) {
    return (
      <span style={{ color: "grey" }}> (or {alternatives.join("/")})</span>
    );
  }
  return null;
}


function CocktailCard({
  cocktail,
  ingredientsAvailability,
  setIngredientAvailability,
}) {
  return (
    <div>
      <h2>
        <img
          style={{ height: "4rem" }}
          src={`https://${domain}/${cocktail.imgSrc}`}
        />
        {cocktail.name}
        <a
          style={{ fontSize: "0.9rem", marginLeft: "5px" }}
          href={`https://${domain}${cocktail.url}`}
          target="_blank"
        >
          link
        </a>
      </h2>

      <ul>
        {cocktail.ingredients.map(
          ({ amount, ingredientName, alternateIngredientsNames }) => {
            return (
              <li key={ingredientName}>
                {amount}{" "}
                <IngredientWithAvailability
                  ingredientName={ingredientName}
                  availability={ingredientsAvailability[ingredientName]}
                  setIngredientAvailability={setIngredientAvailability}
                />
                <Alternatives alternatives={alternateIngredientsNames} />
              </li>
            );
          }
        )}
      </ul>
    </div>
  );
}

function IngredientWithAvailability({
  ingredientName,
  availability,
  setIngredientAvailability,
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

  const incrementAvailability = React.useCallback(() => {
    const newAvailability =
      availability === "no" ? "maybe" : availability === "maybe" ? "yes" : "no";
    setIngredientAvailability(ingredientName, newAvailability);
  }, [availability, setIngredientAvailability]);

  function buildIngredientUrl() {
    return `https://${domain}/ingredients/${ingredientName.replace(" ", "-")}`;
  }

  return (
    <span>
      <a
        href={buildIngredientUrl()}
        style={{
          textDecoration: availability === "no" ? "line-through" : "initial",
        }}
      >
        {ingredientName}
      </a>
      <span
        style={{
          padding: "0 5px",
          margin: "0 5px",
          borderRadius: "5px",
          color: "white",
          cursor: "pointer",
          backgroundColor: translateAvailabilityAsColor(availability),
        }}
        onClick={incrementAvailability}
      >
        {availability || "???"}
      </span>
    </span>
  );
}

function SettingsOverlay({
  ingredientsAvailability,
  setIngredientAvailability,
  ingredientsFilterMode,
  setIngredientsFilterMode,
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
        onChange={(e) => setIngredientsFilterMode(e.target.value)}
      >
        <option value="all">All cocktails</option>
        <option value="only_yes">Only with Yes</option>
        <option value="yes_or_maybe">Only with Yes or Maybe</option>
      </select>

      <h3>Ingredients available or not</h3>
      {Object.entries(ingredientsAvailability).map(
        ([ingredientName, availability]) => {
          return (
            <p key={ingredientName}>
              <IngredientWithAvailability
                ingredientName={ingredientName}
                availability={availability}
                setIngredientAvailability={setIngredientAvailability}
              />
            </p>
          );
        }
      )}
    </div>
  );
}

function CocktailsTable({
  ingredientsAvailability,
  setIngredientAvailability,
  ingredientsFilterMode,
}) {
  const data = window.DB;
  return (
    <div>
      {data
        .filter(({ ingredients }) => {
          if (ingredientsFilterMode === "all") return true;
          return ingredients.every(({ ingredientName }) => {
            const availability = ingredientsAvailability[ingredientName];
            return (
              [null, undefined, "yes"].includes(availability) ||
              (availability === "maybe" &&
                ingredientsFilterMode === "yes_or_maybe")
            );
          });
        })
        .map((cocktail) => {
          return (
            <CocktailCard
              key={cocktail.name}
              cocktail={cocktail}
              ingredientsAvailability={ingredientsAvailability}
              setIngredientAvailability={setIngredientAvailability}
            />
          );
        })}
    </div>
  );
}

function persistIngredientsAvailability(ingredientsAvailability) {
  localStorage.setItem(
    "availabilities",
    JSON.stringify(ingredientsAvailability)
  );
}

function readIngredientsAvailabilityFromPersistence() {
  return JSON.parse(localStorage.getItem("availabilities") || "{}");
}

function App() {
  const [ingredientsAvailability, setIngredientsAvailability] = React.useState(
    // map ingredient name => 'no' / 'maybe' / 'yes'
    readIngredientsAvailabilityFromPersistence()
  );
  // 'all' / 'only_yes' / 'yes_or_maybe'
  const [ingredientsFilterMode, setIngredientsFilterMode] =
    React.useState("all");

  const setIngredientAvailability = React.useCallback(
    (ingredientName, availability) => {
      const newMap = {
        ...ingredientsAvailability,
        [ingredientName]: availability,
      };
      setIngredientsAvailability(newMap);
      setTimeout(() => {
        persistIngredientsAvailability(newMap);
      }, 50);
    },
    [ingredientsAvailability]
  );

  const props = {
    ingredientsAvailability,
    setIngredientAvailability,
    ingredientsFilterMode,
    setIngredientsFilterMode,
  };
  return (
    <div>
      <SettingsOverlay {...props} />
      <CocktailsTable {...props} />
    </div>
  );
}

const domContainer = document.querySelector("#root");
ReactDOM.render(e(App), domContainer);
