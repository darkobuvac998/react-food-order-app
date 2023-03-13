import classes from "./Checkout.module.css";

import { useRef, useState } from "react";

const isEmpty = (value) => value.trim() === "";
const isNotFieveChars = (value) => value.trim().length !== 5;

const Checkout = (props) => {
  const [state, setState] = useState({
    name: true,
    postal: true,
    street: true,
    city: true,
  });

  const nameInput = useRef();
  const streetInput = useRef();
  const cityInput = useRef();
  const postalInput = useRef();

  const cancelHandler = () => {
    props.onCancel();
  };

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInput.current.value;
    const enteredStreet = streetInput.current.value;
    const enteredPostalCode = postalInput.current.value;
    const enteredCity = cityInput.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredPostalCodeIsValid =
      !isEmpty(enteredPostalCode) && !isNotFieveChars(enteredPostalCode);
    const enteredCityIsValid = !isEmpty(enteredCity);

    setState({
      city: enteredCityIsValid,
      name: enteredNameIsValid,
      postal: enteredPostalCodeIsValid,
      street: enteredStreetIsValid,
    });

    const formIsValid =
      enteredCityIsValid &&
      enteredNameIsValid &&
      enteredPostalCodeIsValid &&
      enteredStreetIsValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      city: enteredCity,
      postalCode: enteredPostalCode,
      street: enteredStreet,
    });
  };

  const getControlClasses = (prop) =>
    `${classes.control} ${state[prop] ? "" : classes.invalid}`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={getControlClasses("name")}>
        <label htmlFor="name">Your Name</label>
        <input ref={nameInput} type="text" id="name" />
        {!state.name && <p>Please enter a valid name.</p>}
      </div>
      <div className={getControlClasses("street")}>
        <label htmlFor="street">Street</label>
        <input ref={streetInput} type="text" id="street" />
        {!state.street && <p>Please enter a valid street.</p>}
      </div>
      <div className={getControlClasses("postal")}>
        <label htmlFor="postal">Postal Code</label>
        <input ref={postalInput} type="text" id="postal" />
        {!state.postal && <p>Please enter a valid postal code.</p>}
      </div>
      <div className={getControlClasses("city")}>
        <label htmlFor="city">City</label>
        <input ref={cityInput} type="text" id="city" />
        {!state.city && <p>Please enter a valid city.</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler}>
          Cancel
        </button>
        <button className={classes.submit} type="submit">
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
