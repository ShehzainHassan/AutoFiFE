import ButtonPrimary from "@/app/components/buttons/button-primary/button-primary";
import { WHITE_THEME } from "@/constants/button-primary-themes";
import { ThemeProvider } from "@/theme/themeContext";
import headings from "@/styles/typography.module.css";
import classes from "./contact.module.css";
import { ContactProps } from "./contact.types";
const ContactInfoResultCard = ({ setIsModalOpen }: ContactProps) => {
  return (
    <div className={classes.contact}>
      <p className={`${headings.contact} ${classes.blue}`}>01622 237423</p>
      <ThemeProvider value={WHITE_THEME}>
        <ButtonPrimary
          onClick={() => setIsModalOpen(true)}
          btnText="Request info"
        />
      </ThemeProvider>
    </div>
  );
};
export default ContactInfoResultCard;
