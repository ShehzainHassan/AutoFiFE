import classes from "./input.module.css";
export default function InputWithLabel() {
  return (
    <div className={classes.container}>
      <p>Postcode</p>
      <input type="number" className={classes.input}></input>
    </div>
  );
}
