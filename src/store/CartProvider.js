import { useReducer } from "react";

import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    const updatedTotalAmount =
      state.totalAmount + action.value.price * action.value.amount;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.value.id
    );

    const existingItem = state.items[existingCartItemIndex];

    let updatedItems;

    if (existingItem) {
      const updatedItem = {
        ...existingItem,
        amount: existingItem.amount + action.value.amount,
      };

      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.value);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "REMOVE_ITEM") {
    let cartItemIndex = state.items.findIndex(
      (item) => item.id === action.value
    );

    let cartItem = state.items[cartItemIndex];

    let totalAmount = state.totalAmount - cartItem?.price;

    if (cartItem.amount === 1) {
      return {
        items: state.items.filter((item) => item.id !== action.value),
        totalAmount: totalAmount,
      };
    }

    let updatedItems;

    cartItem = {
      ...cartItem,
      amount: cartItem.amount - 1,
    };

    updatedItems = [...state.items];
    updatedItems[cartItemIndex] = cartItem;

    return {
      items: updatedItems,
      totalAmount: totalAmount,
    };
  }

  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({
      type: "ADD_ITEM",
      value: item,
    });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({
      type: "REMOVE_ITEM",
      value: id,
    });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
