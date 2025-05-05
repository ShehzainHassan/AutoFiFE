import headings from "@/styles/typography.module.css";
import classes from "./statistics.module.css";
import Wrapper from "../Wrapper/wrapper";
export default function Statistics() {
  return (
    <Wrapper padding="55px 371px 0px">
      <div className={classes.statsContainer}>
        <div className={classes.statContainer}>
          <h1 className={headings.numberText}>836M</h1>
          <p className={`${headings.mediumSpaced}`}>Cars For Sale</p>
        </div>
        <div className={classes.statContainer}>
          <h1 className={headings.numberText}>738M</h1>
          <p className={`${headings.mediumSpaced}`}>Cars For Sale</p>
        </div>
        <div className={classes.statContainer}>
          <h1 className={headings.numberText}>100M</h1>
          <p className={`${headings.mediumSpaced}`}>Cars For Sale</p>
        </div>
        <div className={classes.statContainer}>
          <h1 className={headings.numberText}>238M</h1>
          <p className={`${headings.mediumSpaced}`}>Cars For Sale</p>
        </div>
      </div>
      <div className={classes.border} />
    </Wrapper>
  );
}
