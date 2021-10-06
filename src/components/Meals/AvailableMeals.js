import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import { useEffect, useState } from "react";

function AvailableMeals() {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      //should not return a promise
      const response = await fetch(
        "https://food-order-74641-default-rtdb.firebaseio.com/meals.json"
      );

      //utilize response data
      const responseData = await response.json();

      const loadedMeals = [];

      //loop through keys in responseData
      for (const key in responseData) {
        // add these objects to empty array
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }

      //set loaded meals into state
      setMeals(loadedMeals);
    };

    fetchMeals();
  }, []);

  // used to map meals state
  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.key}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  return (
    <section className={classes.meal}>
      <Card>{<ul>{mealsList}</ul>}</Card>
    </section>
  );
}

export default AvailableMeals;
