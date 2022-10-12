import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState, useContext, useRef } from "react";
import { Button } from "react-bootstrap";

function App() {
  const inputElement = useRef();
  const HTMLRef = useRef();
  const App_ID = "19430f88";
  const App_KEY = "3cec4bf700d45fe28679e4c97f12740b";
  const [item, setItem] = useState("pizza");
  const [infoRecipe, setInfoRecipe] = useState([]);
  const [Ingredients, setIngredients] = useState([]);
  var Ing = [];
  // const example = `https://api.edamam.com/api/recipes/v2/0123456789abcdef0123456789abcdef?app_id=${App_ID}&app_key=${App_KEY}&type=public`;

  function GetRecipeName(e) {
    e.preventDefault(); // Prevents refreshing the page after button click
    const recipe = inputElement.current.value;
    console.log("recipe:", recipe);
    setItem(recipe);
    inputElement.current.value = null;
  }

  useEffect(() => {
    getRecipies();
  }, [item]);

  useEffect(() => {
    console.log("infoRecipe:", infoRecipe);
  }, [infoRecipe]);
  async function getRecipies() {
    console.log("item:", item);
    const response = await fetch(
      `https://api.edamam.com/search?q=${item}&app_id=${App_ID}&app_key=${App_KEY}`
    );
    // `https://api.edamam.com/api/recipes/v2`
    // ?type=public

    const data = await response.json();
    console.log(data);
    setInfoRecipe(data.hits);
  }

  // function FoodDescription(index) {
  //   console.log("FOOD:", infoRecipe[0].recipe.label);
  // }
  function FoodDescription(e, index) {
    console.log("FOOD:", infoRecipe[index].recipe.label);
    // console.log(document.getElementById("Ingredients").innerHTML);
    // console.log("HTML:", e.target.textContent);
    // useRef.current.textContent
  }

  function buttonclick(e, x, index) {
    console.log(e.target.textContent); // text of the button
    if (e.target.textContent === "Open") {
      e.target.textContent = "Close";
      if (index < Ingredients.length - 1) {
        Ing[index] = x.recipe.ingredientLines;
        Ingredients[index] = x.recipe.ingredientLines;
        console.log("Index1:", index);
      } else {
        Ing.push(x.recipe.ingredientLines);
        setIngredients((prev) => {
          console.log("Index2:", index);
          return [...prev, x.recipe.ingredientLines];
        });
      }
      // setIngredients(x.recipe.ingredientLines);
    } else if (e.target.textContent === "Close") {
      Ing[index] = 0;
      e.target.textContent = "Open";
      console.log("Index3:", index);
      Ingredients[index] = 0;
    }
  }

  useEffect(() => {
    console.log("INH:", Ingredients);
  }, [Ingredients]);

  return (
    <div className="App">
      <form className="search-form">
        <input className="search-bar" type="text" ref={inputElement} />
        <button className="search-button" type="submit" onClick={GetRecipeName}>
          Search
        </button>
      </form>
      {infoRecipe.map((x, index) => {
        // console.log(x.recipe.label);
        // const cuisineTypeArray = ["hi", "bt"].split();
        // console.log("Index:", index);
        return (
          <div key={x.recipe.label} className="Food">
            <div
              className="FoodInfo"
              onClick={(event) => {
                FoodDescription(event, index);
              }}
              // onClick={() =>
              //   console.log("FOOD:", infoRecipe[index].recipe.label)

              // }
            >
              <div className="FoodSubParts" ref={HTMLRef} id="foodLabel">
                {x.recipe.label}
              </div>
              <div className="FoodSubParts">
                {x.recipe.cuisineType.join(",")}
              </div>
              <div className="FoodSubParts" id="img">
                <img
                  src={x.recipe.image}
                  alt=""
                  style={{ width: "70%", height: "70%" }}
                />
              </div>

              {x.recipe.ingredientLines.map((ingredient, index) => {
                return (
                  <div id="Ingredients">
                    <span id="indexSpan">{index}: </span>
                    <span>{ingredient}</span>
                  </div>
                );
              })}
              {/* <div class="button_">
                <Button
                  variant="info"
                  onClick={(event) => {
                    buttonclick(event, x, index);
                  }}
                >
                  Open
                </Button>
              </div> */}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
