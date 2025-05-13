import classes from "./input-with-label.module.css";
type InputWithLabelProps = {
  label: string;
  value?: number | string;
  onChange?: () => void;
};
export default function InputWithLabel({
  label,
  value = 0,
  onChange,
}: InputWithLabelProps) {
  return (
    <div className={classes.container}>
      <p>{label}</p>
      <input
        type="number"
        defaultValue={value}
        onChange={onChange}
        className={classes.input}
      />
    </div>
  );
}
