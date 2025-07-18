import Thumbnail from "@/assets/images/general/thumbnail.jpg";
import PlayIcon from "@/assets/images/icons/play.png";
import Image from "next/image";
import Wrapper from '../Wrapper/wrapper';
import classes from "./car-video.module.css";
import VideoDescription from "./video-description/video-description";
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

  return (
    <Wrapper padding="0px 110px 0px 120px">
      <div className={classes.container}>
        <div className={classes.imageWrapper}>
          <Image
            src={Thumbnail}
            loading="lazy"
            placeholder="blur"
            alt="thumbnail"
            fill
          />
          <div className={classes.playButton}>
            <Image
              src={PlayIcon}
              loading="lazy"
              placeholder="blur"
              alt="play"
              width={22}
              height={24}
            />
          </div>
        </div>
        <VideoDescription
          title={title}
          description={description}
          benefits={benefits}
          buttonText={buttonText}
        />
      </div>
    </Wrapper>
  );
}
