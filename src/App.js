import { useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";

//wrap all components in CartPRovider since they will all need context to update the cart
import CartProvider from "./store/CartProvider";

function App() {
  //useState to make inside cart visible
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = (event) => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };
  return (
    //onShowCart prop is passed down as function to Header
    //when user hits onClick on HeaderCartButton icon, it switches to True, so cartIsShown switches to true and Cart shows
    //onClose on Cart is button within Card
    //hideCartHandler when hits onClick sets the useState back to false
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
