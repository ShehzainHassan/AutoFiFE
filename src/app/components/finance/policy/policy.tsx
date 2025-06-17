import classes from "./policy.module.css";
const Policy = () => {
  return (
    <div className={classes.policyContainer}>
      <p>
        By starting your quote, you agree to our{" "}
        <span className={classes.bold}>Privacy Policy</span>
      </p>
      <p>Rates from 9.9% APR.</p>
      <p>
        Representative Example: Borrow £11,000 over 5 years with a £0 deposit.
        Representative 16.9% APR fixed rate. Monthly payment: £265.85. Option to
        purchase fee £10 payable. Total cost of credit: £4,961.00. Total amount
        repayable: £15,961.00.
      </p>
      <p>CarFinance 24/7 Limited is a credit broker not a lender</p>
      <p>
        Registered address: Universal Square, Devonshire Street North,
        Manchester, M12 6JH.
      </p>
      <p>
        Car Finance 247 will pay us a commission for introducing a customer who
        takes out a motor finance agreement. The commission paid is a fixed
        amount per agreement that is directly linked to the amount you borrow.
      </p>
    </div>
  );
};
export default Policy;
