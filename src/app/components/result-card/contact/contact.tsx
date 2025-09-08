import { ButtonPrimary } from "@/app/components";
import { WHITE_THEME } from "@/constants/button-primary-themes";
import { ThemeProvider } from "@/theme/themeContext";
import headings from "@/styles/typography.module.css";
import classes from "./contact.module.css";
import { ContactProps } from "./contact.types";

const PHONE_NUMBER = "01622 237423";

const ContactInfoResultCard = ({ setIsModalOpen }: ContactProps) => {
  return (
    <section className={classes.contact} aria-labelledby="contact-info-title">
      <a
        href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`}
        className={`${headings.contact} ${classes.blue}`}
        id="contact-info-title"
        aria-label={`Call ${PHONE_NUMBER}`}>
        {PHONE_NUMBER}
      </a>
      <ThemeProvider value={WHITE_THEME}>
        <ButtonPrimary
          onClick={() => setIsModalOpen(true)}
          btnText="Request info"
          className={classes.requestBtn}
          aria-label="Open request info form"
        />
      </ThemeProvider>
    </section>
  );
};

export default ContactInfoResultCard;
