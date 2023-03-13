import { Fragment, useContext, useState } from "react";
import Modal from "../ui/Modal";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [state, setState] = useState({
    isCheckout: false,
    isSubmitting: false,
    didSumbit: false,
  });

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items?.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setState((prevState) => {
      return {
        ...prevState,
        isCheckout: true,
      };
    });
  };

  const submitOrderHandler = async (userData) => {
    setState((prevState) => {
      return {
        ...prevState,
        isSubmitting: true,
      };
    });

    await fetch("https://react-http-6b4a6.firebaseio.com/orders.json", {
      method: "POST",
      body: JSON.stringify({
        user: userData,
        orderedItems: cartCtx.items,
      }),
    });

    setState((prevState) => {
      return {
        ...prevState,
        isSubmitting: false,
        didSumbit: true,
      };
    });
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {state.isCheckout && (
        <Checkout onCancel={props.onClose} onConfirm={submitOrderHandler} />
      )}
      {!state.isCheckout && modalActions}
    </Fragment>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;

  const didSubmitModalContent = <p>Successfully sent the order!</p>;

  return (
    <Modal onClose={props.onClose}>
      {!state.isSubmitting && !state.didSumbit && cartModalContent}
      {state.isSubmitting && isSubmittingModalContent}
      {!state.isSubmitting && state.didSumbit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
