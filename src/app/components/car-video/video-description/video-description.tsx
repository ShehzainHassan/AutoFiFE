import ArrowWhiteIcon from "@/assets/images/icons/arrow-white.png";
import headings from "@/styles/typography.module.css";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "../car-video.module.css";
import { ButtonPrimary } from "@/app/components";
import { BUY_CARD } from "@/constants/button-primary-themes";
import { ThemeProvider } from "@/theme/themeContext";
import { VideoDescriptionProps } from "./video-description.types";

const VideoDescription = ({
  title,
  description,
  benefits,
  buttonText,
}: VideoDescriptionProps) => {
  return (
    <div className={classes.details}>
      <h1 className={headings.spacedTitle}>{title}</h1>
      <p className={headings.criteriaText}>{description}</p>
      <div className={classes.benefits}>
        {benefits.map((benefit, idx) => (
          <div key={idx} className={classes.contentContainer}>
            <div className={classes.tickContainer}>
              <FontAwesomeIcon className={classes.tick} icon={faCheck} />
            </div>
            <p className={headings.navElement}>{benefit}</p>
          </div>
        ))}
      </div>
      <ThemeProvider value={BUY_CARD}>
        <ButtonPrimary
          btnText={buttonText}
          imgPos="right"
          imgSrc={ArrowWhiteIcon}
        />
      </ThemeProvider>
    </div>
  );
};
export default VideoDescription;
