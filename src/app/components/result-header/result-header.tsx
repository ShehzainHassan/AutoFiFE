import { useUserFavorites } from "@/contexts/user-favorites-context/user-favorites-context";
import headings from "@/styles/typography.module.css";
import SaveSearchButtonContainer from "../handle-save-search/handle-save-search-container";
import classes from "./result-header.module.css";
import { ResultHeaderProps } from "./result-header.types";

const ResultHeader = ({ resultText }: ResultHeaderProps) => {
  const { loadingSearches } = useUserFavorites();

  return (
    <div className={classes.resultHeader}>
      <h1 className={headings.resultTitle}>{resultText}</h1>
      <div className={classes.resultHeaderText}>
        <p className={classes.text}>
          See our <span className={classes.bold}>3,517</span> reviews on
          <span className={classes.star} />
          Trustpilot
        </p>
        {loadingSearches ? <p>Loading...</p> : <SaveSearchButtonContainer />}
      </div>
    </div>
  );
};

export default ResultHeader;
