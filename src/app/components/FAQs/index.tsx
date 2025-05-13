import classes from "./faqs.module.css";
export default function FAQs() {
  return (
    <div className={classes.faqs}>
      <h2 className={`${classes.bold}`}>Bentley Arnage FAQs</h2>
      <p className={`${classes.bold}`}>
        How much does the Bentley Arnage cost?
      </p>
      <p>
        The average Bentley Arnage costs about $29,299.08. The average price has
        decreased by -7.6% since last year. The 16 for sale on CarGurus range
        from $11,995 to $69,950 in price.
      </p>
      <p className={`${classes.bold}`}>
        How many Bentley Arnage vehicles have no reported accidents or damage?
      </p>
      <p>16 out of 16 for sale have no reported accidents or damage</p>
      <p className={`${classes.bold}`}>What fuel types are available?</p>
      <p>Petrol engines are available</p>
    </div>
  );
}
