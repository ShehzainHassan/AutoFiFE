import classes from "./about.module.css";
export default function About() {
  return (
    <div className={classes.container}>
      <div className={classes.top}>
        <h1>
          &quot;BoxAssistant&quot; - AI-powered Assistance to Handle your
          queries
        </h1>
        <p>
          <span>BoxCars</span> is a car finance web app that utilizes AI to
          provide personalized vehicle recommendations for car buyers. Users
          input their preferences, budget, and requirements, and AutoFi
          generates tailored vehicle suggestions that consider factors like:
        </p>
      </div>
      <div className={classes.factorsContainer}>
        <div className={classes.finance}>
          <p className={classes.header}>-{">"} Finance Opportunity:</p>
          <p>
            The global pet care market is expected to reach a staggering $326.6
            billion by 2027, with a growing segment focused on pet wellness and
            convenience.
          </p>
        </div>
        <div className={classes.finance}>
          <p className={classes.header}>-{">"} Finance Opportunity:</p>
          <p>
            The global pet care market is expected to reach a staggering $326.6
            billion by 2027, with a growing segment focused on pet wellness and
            convenience.
          </p>
        </div>
        <div className={classes.finance}>
          <p className={classes.header}>-{">"} Finance Opportunity:</p>
          <p>
            The global pet care market is expected to reach a staggering $326.6
            billion by 2027, with a growing segment focused on pet wellness and
            convenience.
          </p>
        </div>
        <div className={classes.finance}>
          <p className={classes.header}>-{">"} Finance Opportunity:</p>
          <p>
            The global pet care market is expected to reach a staggering $326.6
            billion by 2027, with a growing segment focused on pet wellness and
            convenience.
          </p>
        </div>
      </div>
    </div>
  );
}
