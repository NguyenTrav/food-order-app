import classes from "./Input.module.css";
function Input(props) {
  return (
    /* {...props.input} ensures all key values pair from {props.input.id} are added to the <input> */
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input {...props.input} />
    </div>
  );
}

export default Input;
