import React, { Fragment, useState } from "react";
import Header from "./components/layout/Header";
import Meals from "./components/meals/Meals";
import Cart from "./components/cart/Cart";
import CartProvider from "./store/CartProvider";

const App = () => {
  const [cartItemShown, setCartItemShown] = useState(false);

  const showCartHandler = () => {
    setCartItemShown(true);
  };

  const hideCartHandler = () => {
    setCartItemShown(false);
  };

  return (
    <CartProvider>
      {cartItemShown && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
};

export default App;
