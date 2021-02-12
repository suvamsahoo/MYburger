import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import Aux from "../../hoc/Auxx";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios_orders from "../../axios-orders";

const INGREDIENT_PRICES = {
  salad: 5,
  cheese: 20,
  meat: 65,
  bacon: 30,
};
class BurgerBuilder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ingredients: null,
      totalPrice: 20,
      purchasable: false,
      purchasing: false,
      loading: false,
      error: false,
    };
  }

  componentDidMount() {
    axios_orders
      .get("https://react-my-burger-3132.firebaseio.com/ingredients.json")
      .then((response) => {
        this.setState({ ingredients: response.data });
      })
      .catch((error) => {
        this.setState({ error: true });
      });
  }

  updatePurchaseState = (updatedIngredientsObject) => {
    const SUM = Object.keys(updatedIngredientsObject)
      .map((ingredientKey) => {
        return updatedIngredientsObject[ingredientKey];
      })
      .reduce((sum, ele) => {
        return sum + ele;
      }, 0);

    this.setState({ purchasable: SUM > 0 });
  };

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCounted = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCounted;
    const oldPrice = this.state.totalPrice;
    const priceAddition = INGREDIENT_PRICES[type];
    const newPrice = oldPrice + priceAddition;

    this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });

    this.updatePurchaseState(updatedIngredients);
  };
  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount > 0) {
      const updatedCounted = oldCount - 1;
      const updatedIngredients = {
        ...this.state.ingredients,
      };
      updatedIngredients[type] = updatedCounted;
      const oldPrice = this.state.totalPrice;
      const priceDeduction = INGREDIENT_PRICES[type];
      const newPrice = oldPrice - priceDeduction;

      this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });

      this.updatePurchaseState(updatedIngredients);
    }
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };
  purchaseCancleHandler = () => {
    this.setState({ purchasing: false });
  };
  purchaseContinueHandler = () => {
    // this.setState({ loading: true }); //loading spinner On.
    // const orderData = {
    //   ingredients: this.state.ingredients,
    //   price: this.state.totalPrice,
    //   customer: {
    //     name: "Luki Lee",
    //     address: {
    //       street: "6th cross road",
    //       zipCode: "67950",
    //       city: "Bangalore",
    //       country: "India",
    //     },
    //     email: "lukilee@gmail.com",
    //   },
    //   deliveryMethod: "fastest",
    // };

    // //'order' data which send to this path-:
    // axios_orders
    //   .post("/orders.json", orderData)
    //   .then((response) => {
    //     //loading spinner off
    //     this.setState({ loading: false, purchasing: false });
    //     console.log(`sent data: ${response}`);
    //   })
    //   .catch((error) => {
    //     //loading spinner off
    //     this.setState({ loading: false, purchasing: false });
    //     console.log(`Error: ${error}`);
    //   });

    const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.state.ingredients[i])
      );
    }
    queryParams.push('price=' + this.state.totalPrice)
    const queryString = queryParams.join("&");

    this.props.history.push({
      //switch the page or push a new page onto the history stack.
      pathname: "/checkout",
      search: "?" + queryString,
    });
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0; //true or false
    }

    let Order_Summary = null;

    let burger = this.state.error ? (
      <p>Ingredients can not be loaded!</p>
    ) : (
      <Spinner />
    );

    if (this.state.ingredients !== null) {
      //ingredients is not null
      burger = (
        <Aux>
          <Burger IngredientsObj={this.state.ingredients} />
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            price={this.state.totalPrice}
            IsPurchasable={this.state.purchasable}
            ordered={this.purchaseHandler}
          />
        </Aux>
      );
      Order_Summary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          purchaseCancled={this.purchaseCancleHandler}
          purchaseContinued={this.purchaseContinueHandler}
          TP={this.state.totalPrice}
        />
      );
    }

    if (this.state.loading === true) {
      //loading spinner On
      Order_Summary = <Spinner />;
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancleHandler}
        >
          {Order_Summary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios_orders);
