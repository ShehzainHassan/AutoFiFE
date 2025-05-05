import headings from "@/styles/typography.module.css";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import ButtonSecondary from "../Buttons/Secondary/secondary";
import Wrapper from "../Wrapper/wrapper";
import classes from "./car-video.module.css";
export default function CarVideo() {
  return (
    <Wrapper padding="120px 110px 60px">
      <div className={classes.container}>
        <div className={classes.imageWrapper}>
          <Image src="/images/thumbnail.jpg" alt="thumbnail" fill />
          <div className={classes.playButton}>
            <Image src="/images/play.png" alt="play" width={22} height={24} />
          </div>
        </div>
        <div className={classes.details}>
          <h1 className={headings.spacedTitle}>
            Get a Fair Price For Your Car Sell To Us Today
          </h1>
          <p className={headings.criteriaText}>
            We are committed to providing our customers with expectional
            service, competitive pricing, and a wide range of.
          </p>
          <div className={classes.benefits}>
            <div className={classes.contentContainer}>
              <div className={classes.tickContainer}>
                <FontAwesomeIcon className={classes.tick} icon={faCheck} />
              </div>
              <p className={headings.navElement}>
                We are the UK&apos;s largest provider, with more patrols in more
                places
              </p>
            </div>
            <div className={classes.contentContainer}>
              <div className={classes.tickContainer}>
                <FontAwesomeIcon className={classes.tick} icon={faCheck} />
              </div>
              <p className={headings.navElement}>
                You get 24/7 roadside assistance
              </p>
            </div>
            <div className={classes.contentContainer}>
              <div className={classes.tickContainer}>
                <FontAwesomeIcon className={classes.tick} icon={faCheck} />
              </div>
              <p className={headings.navElement}>
                We fix 4 out of 5 cars at the roadside
              </p>
            </div>
          </div>
          <ButtonSecondary padding="19px 26px 45px" btnText="Get Started" />
        </div>
      </div>
      <div></div>
    </Wrapper>
  );
}
