import Image from "next/image";
import classes from "./partner-info.module.css";
import headings from "@/styles/typography.module.css";
import PartnerIcon from "@/assets/images/icons/partner.png";
const PartnerInfo = () => (
  <div className={classes.partner}>
    <Image
      src={PartnerIcon}
      alt="partner"
      width={16}
      height={16}
      loading="lazy"
      placeholder="blur"
    />
    <p className={headings.carTitle}>CarGurus partner</p>
  </div>
);
export default PartnerInfo;
