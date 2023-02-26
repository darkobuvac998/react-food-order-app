import Input from "../../ui/Input";
import classes from "./MealItemForm.module.css";

const MealItemForm = () => {
  return (
    <form className={classes.form}>
      <Input
        label="Amount"
        input={{
          type: "number",
          id: "amount",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
    </form>
  );
};

export default MealItemForm;
