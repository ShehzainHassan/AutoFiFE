import AndroidIcon from "@/assets/images/icons/android.svg";
import AppleIcon from "@/assets/images/icons/apple.png";
import useHandleBrandClick from "@/hooks/useHandleBrandClick";
import headings from "@/styles/typography.module.css";
import Image from "next/image";
import EmailBox from "../email-box/email-box";
import classes from "./footer.module.css";
const footerData = [
  {
    title: "Company",
    items: ["About Us", "Blog", "Services", "FAQs", "Terms", "Contact Us"],
  },
  {
    title: "Quick Links",
    items: ["Get in Touch", "Help center", "Live chat", "How it works"],
  },
  {
    title: "Our Brands",
    items: ["Toyota", "Audi", "BMW", "Ford", "Nissan", "Volkswagen"],
  },
  {
    title: "Vehicle Type",
    items: [
      "Sedan",
      "SUV",
      "Hybrid",
      "Electric",
      "Coupe",
      "Truck",
      "Convertible",
    ],
  },
];
export default function Footer() {
  const handleBrandClick = useHandleBrandClick();
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
        {footerData.map((column, index) => (
          <div key={index} className={classes.subList}>
            <h4 className={headings.footerTitle}>{column.title}</h4>
            {column.items.map((item, i) => {
              const isBrandColumn = column.title === "Our Brands";
              return (
                <p
                  key={i}
                  className={`${headings.criteriaText} ${classes.footerText} `}
                  onClick={() => isBrandColumn && handleBrandClick(item)}>
                  {item}
                </p>
              );
            })}
          </div>
        ))}

        <div className={`${classes.mobileList} ${classes.white}`}>
          <h2 className={headings.footerTitle}>Our Mobile App</h2>
          <div className={classes.appleAndroid}>
            <div className={classes.downloadContainer}>
              <Image
                src={AppleIcon}
                alt="apple"
                width={25}
                height={25}
                loading="lazy"
                placeholder="blur"
              />
              <div className={classes.downloadText}>
                <p className={headings.tinyText}>Download on the</p>
                <h2 className={headings.modelText}>App Store</h2>
              </div>
            </div>
            <div className={classes.downloadContainer}>
              <Image
                src={AndroidIcon}
                alt="android"
                width={25}
                height={25}
                loading="lazy"
              />
              <div className={classes.downloadText}>
                <p className={headings.tinyText}>Download on the</p>
                <h2 className={headings.modelText}>Play Store</h2>
              </div>
            </div>
          </div>

          <div className={classes.connectContainer}>
            <h3>Connect With Us</h3>
            <div className={classes.connect}>
              {["facebook", "twitter", "instagram", "linked-in"].map(
                (platform) => (
                  <div key={platform} className={classes.box}>
                    <Image
                      src={`/images/${platform}.png`}
                      alt={platform}
                      width={20}
                      height={20}
                      loading="lazy"
                    />
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      <div className={`${classes.white} ${classes.footerBottom}`}>
        <div>
          <p>© 2025 BoxCar, All rights reserved</p>
        </div>
        <div className={classes.termsPrivacy}>
          <p>Terms & Conditions</p>
          <div className={classes.privacy}>
            <div className={classes.circle} />
            <p>Privacy Notice</p>
          </div>
        </div>
      </div>
    </div>
  );
}
