import React from "react";
import "./Burger.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const Burger = (props) => {
  //transformed Object to Array-:
  let IngredientsArray = Object.keys(props.IngredientsObj)
    .map((IngredientKey) => {
      return [...Array(props.IngredientsObj[IngredientKey])].map((_, index) => {
        return (
          <BurgerIngredient key={IngredientKey + index} type={IngredientKey} />
        );
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);

  if (IngredientsArray.length === 0) {
    IngredientsArray = <p>-: Please start adding ingredients :-</p>;
  }

  //console.log(props.IngredientsObj); //{salad: 1, bacon: 1, cheese: 2, meat: 2}
  //console.log(Object.keys(props.IngredientsObj)); //["salad", "bacon", "cheese", "meat"]
  //console.log(IngredientsArray);

  return (
    <div className="Burger">
      <BurgerIngredient type="bread-top" />
      {/* <BurgerIngredient type="cheese" />
      <BurgerIngredient type="meat" /> */}
      {IngredientsArray}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default Burger;
