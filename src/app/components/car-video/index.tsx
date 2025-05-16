import Image from "next/image";
import Wrapper from "../wrapper";
import classes from "./car-video.module.css";
import headings from "@/styles/typography.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ButtonSecondary from "../buttons/Secondary";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export default function CarVideo() {
  const benefits = [
    "We are the UK's largest provider, with more patrols in more places",
    "You get 24/7 roadside assistance",
    "We fix 4 out of 5 cars at the roadside",
  ];
  const title = "Get A Fair Price For Your Car Sell To Us Today";
  const description =
    "We are committed to providing our customers with exceptional service, competitive pricing, and wide range of.";
  const buttonText = "Get Started";

  const VideoDescription = () => {
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

        <ButtonSecondary btnText={buttonText} padding="19px 26px 45px" />
      </div>
    );
  };
  return (
    <Wrapper padding="120px 110px 0px">
      <div className={classes.container}>
        <div className={classes.imageWrapper}>
          <Image src="/images/thumbnail.jpg" alt="thumbnail" fill />
          <div className={classes.playButton}>
            <Image src="/images/play.png" alt="play" width={22} height={24} />
          </div>
        </div>
        <VideoDescription />
      </div>
    </Wrapper>
  );
}
