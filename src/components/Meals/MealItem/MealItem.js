import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import { useContext } from "react";
import CartContext from "../../../store/cart-context";

function MealItem(props) {
  const price = `$${props.price.toFixed(2)}`;

  //create connection to context
  const cartCtx = useContext(CartContext);

  //grab amount via useContext
  const addToCartHandler = (amount) => {
    //call addItem from Provider, which calls addItemToCartHandler to create new object
    cartCtx.addItem({
      //props passed from AvailableMeals createing new object
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };
  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
}

export default MealItem;
