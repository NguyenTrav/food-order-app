import CartContext from "./cart-context";
import { useReducer } from "react";

//default state for the cartReducer
const defaultCartState = {
  items: [],
  totalAmount: 0,
};
//outside CartProvider component because won't need anything inside component
const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    //update total amount
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    //JS to find id of duplicate item in array
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    //grabs the id
    const existingCartItem = state.items[existingCartItemIndex];

    let updatedItems;

    //if there is a duplicate sushi in cart, take the existing cart and update the amount
    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    // item is added as first time to cart
    else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "CLEAR") {
    return defaultCartState;
  }

  return defaultCartState;
};

//manage cart-context data and provide to all components that need it
function CartProvider(props) {
  //dispatch for reducer
  //cartState parameter is current state snapshot
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  //function to run to dispatch the change for adding to cart
  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  //function to run to dispatch removal for cart
  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const clearCartHandler = () => {
    dispatchCartAction({ type: "CLEAR" });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
}

export default CartProvider;
