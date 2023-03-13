import React, { useEffect, useState } from "react";

import classes from "./AvailableMeals.module.css";
import Card from "../ui/Card";
import MealItem from "./MealItem/MealItem";

const DUMMY_MEALS = [
  {
    id: "m1",
    name: "Sushi",
    description: "Finest fish and veggies",
    price: 22.99,
  },
  {
    id: "m2",
    name: "Schnitzel",
    description: "A german specialty!",
    price: 16.5,
  },
  {
    id: "m3",
    name: "Barbecue Burger",
    description: "American, raw, meaty",
    price: 12.99,
  },
  {
    id: "m4",
    name: "Green Bowl",
    description: "Healthy...and green...",
    price: 18.99,
  },
];

const AvailableMeals = () => {
  const [state, setState] = useState({
    meals: [],
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const fetchMeals = async () => {
      const respnse = await fetch(
        "https://react-http-6b4a6.firebaseio.com/meals.json"
      );

      if (!respnse.ok) {
        throw new Error("Something went wrong");
      }

      const responseData = await respnse.json();

      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key]?.name,
          description: responseData[key]?.description,
          price: responseData[key]?.price,
        });
      }

      setState((prevState) => {
        return {
          ...prevState,
          meals: loadedMeals,
          isLoading: false,
        };
      });
    };

    fetchMeals().catch((error) => {
      setState((prevState) => {
        return {
          ...prevState,
          isLoading: false,
          meals: prevState.meals,
          error: error.message,
        };
      });
    });
  }, []);

  if (state.isLoading) {
    return (
      <section className={classes["meals-loading"]}>
        <p>Loading ...</p>
      </section>
    );
  }

  // if (state.error) {
  //   return (
  //     <section className={classes["meals-error"]}>
  //       <p>{state.error}</p>
  //     </section>
  //   );
  // }

  const mealsList = DUMMY_MEALS.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
