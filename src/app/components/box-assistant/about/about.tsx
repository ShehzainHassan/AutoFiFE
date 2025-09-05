"use client";

import { useMemo } from "react";
import classes from "./about.module.css";
import { FinanceOpportunity } from "@/interfaces/aiAssistant";

export default function About() {
  const financeOpportunities: FinanceOpportunity[] = useMemo(
    () => [
      {
        id: 1,
        title: "Finance Opportunity:",
        description:
          "The global pet care market is expected to reach a staggering $326.6 billion by 2027, with a growing segment focused on pet wellness and convenience.",
      },
      {
        id: 2,
        title: "Finance Opportunity:",
        description:
          "The global pet care market is expected to reach a staggering $326.6 billion by 2027, with a growing segment focused on pet wellness and convenience.",
      },
      {
        id: 3,
        title: "Finance Opportunity:",
        description:
          "The global pet care market is expected to reach a staggering $326.6 billion by 2027, with a growing segment focused on pet wellness and convenience.",
      },
      {
        id: 4,
        title: "Finance Opportunity:",
        description:
          "The global pet care market is expected to reach a staggering $326.6 billion by 2027, with a growing segment focused on pet wellness and convenience.",
      },
    ],
    []
  );

  return (
    <section
      className={classes.container}
      role="region"
      aria-label="About BoxAssistant">
      <header className={classes.top}>
        <h1>
          &quot;<span className={classes.boxTitle}>BoxAssistant</span>&quot; -
          AI-powered Assistance to Handle your queries
        </h1>
        <p>
          <span>BoxCars</span> is a car finance web app that utilizes AI to
          provide personalized vehicle recommendations for car buyers. Users
          input their preferences, budget, and requirements, and AutoFi
          generates tailored vehicle suggestions that consider factors like:
        </p>
      </header>

      <div
        className={classes.factorsContainer}
        role="list"
        aria-label="Finance Opportunities">
        {financeOpportunities.map((item) => (
          <div key={item.id} className={classes.finance} role="listitem">
            <p className={classes.header} aria-label={item.title}>
              -{">"} {item.title}
            </p>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
