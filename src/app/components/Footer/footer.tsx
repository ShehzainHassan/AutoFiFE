import headings from "@/styles/typography.module.css";
import EmailBox from "../Email Box/email-box";
import classes from "./footer.module.css";
import Image from "next/image";
export default function Footer() {
  return (
    <div className={classes.footer}>
      <div className={classes.subContainer}>
        <div className={classes.headingsContainer}>
          <h2 className={`${headings.mediumTitle} ${classes.white}`}>
            Join BoxCar
          </h2>
          <h6 className={`${headings.criteriaText} ${classes.white}`}>
            Receive pricing updates, shopping tips & more
          </h6>
        </div>
        <EmailBox />
      </div>
      <div className={`${classes.list} ${classes.white}`}>
        <div className={classes.subList}>
          <h4 className={headings.footerTitle}>Company</h4>
          <p className={`${headings.criteriaText} ${classes.footerText}`}>
            About Us
          </p>
          <p className={`${headings.criteriaText} ${classes.footerText}`}>
            About Us
          </p>
          <p className={`${headings.criteriaText} ${classes.footerText}`}>
            About Us
          </p>
          <p className={`${headings.criteriaText} ${classes.footerText}`}>
            About Us
          </p>
          <p className={`${headings.criteriaText} ${classes.footerText}`}>
            About Us
          </p>
          <p className={`${headings.criteriaText} ${classes.footerText}`}>
            About Us
          </p>
        </div>
        <div className={classes.subList}>
          <h4 className={headings.footerTitle}>Company</h4>
          <p className={`${headings.criteriaText} ${classes.footerText}`}>
            About Us
          </p>
          <p className={`${headings.criteriaText} ${classes.footerText}`}>
            About Us
          </p>
          <p className={`${headings.criteriaText} ${classes.footerText}`}>
            About Us
          </p>
          <p className={`${headings.criteriaText} ${classes.footerText}`}>
            About Us
          </p>
          <p className={`${headings.criteriaText} ${classes.footerText}`}>
            About Us
          </p>
          <p className={`${headings.criteriaText} ${classes.footerText}`}>
            About Us
          </p>
        </div>
        <div className={classes.subList}>
          <h4 className={headings.footerTitle}>Company</h4>
          <p className={`${headings.criteriaText} ${classes.footerText}`}>
            About Us
          </p>
          <p className={`${headings.criteriaText} ${classes.footerText}`}>
            About Us
          </p>
          <p className={`${headings.criteriaText} ${classes.footerText}`}>
            About Us
          </p>
          <p className={`${headings.criteriaText} ${classes.footerText}`}>
            About Us
          </p>
          <p className={`${headings.criteriaText} ${classes.footerText}`}>
            About Us
          </p>
          <p className={`${headings.criteriaText} ${classes.footerText}`}>
            About Us
          </p>
        </div>
        <div className={classes.subList}>
          <h4 className={headings.footerTitle}>Company</h4>
          <p className={`${headings.criteriaText} ${classes.footerText}`}>
            About Us
          </p>
          <p className={`${headings.criteriaText} ${classes.footerText}`}>
            About Us
          </p>
          <p className={`${headings.criteriaText} ${classes.footerText}`}>
            About Us
          </p>
          <p className={`${headings.criteriaText} ${classes.footerText}`}>
            About Us
          </p>
          <p className={`${headings.criteriaText} ${classes.footerText}`}>
            About Us
          </p>
          <p className={`${headings.criteriaText} ${classes.footerText}`}>
            About Us
          </p>
        </div>
        <div className={`${classes.mobileList} ${classes.white}`}>
          <h2 className={headings.footerTitle}>Our Mobile App</h2>
          <div className={classes.appleAndroid}>
            <div className={classes.downloadContainer}>
              <Image
                src="/images/apple.png"
                alt="apple"
                width={25}
                height={25}
              />
              <div className={classes.downloadText}>
                <p className={headings.tinyText}>Download on the</p>
                <h2 className={headings.modelText}>App Store </h2>
              </div>
            </div>
            <div className={classes.downloadContainer}>
              <Image
                src="/images/android.svg"
                alt="apple"
                width={25}
                height={25}
              />
              <div className={classes.downloadText}>
                <p className={headings.tinyText}>Download on the</p>
                <h2 className={headings.modelText}>Play Store </h2>
              </div>
            </div>
          </div>

          <div className={classes.connectContainer}>
            <h3>Connect With Us</h3>
            <div className={classes.connect}>
              <div className={classes.box}>
                <Image
                  src="/images/facebook.png"
                  alt="facebook"
                  width={20}
                  height={20}
                />
              </div>
              <div className={classes.box}>
                <Image
                  src="/images/twitter.png"
                  alt="twitter"
                  width={20}
                  height={20}
                />
              </div>
              <div className={classes.box}>
                <Image
                  src="/images/instagram.png"
                  alt="instagram"
                  width={20}
                  height={20}
                />
              </div>
              <div className={classes.box}>
                <Image
                  src="/images/linked-in.png"
                  alt="linked-in"
                  width={20}
                  height={20}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
