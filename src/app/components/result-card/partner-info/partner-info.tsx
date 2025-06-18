import Image from "next/image";
import classes from "./partner-info.module.css";
import headings from "@/styles/typography.module.css";

const PartnerInfo = () => (
  <div className={classes.partner}>
    <Image src="/images/partner.png" alt="partner" width={16} height={16} />
    <p className={headings.carTitle}>CarGurus partner</p>
  </div>
);
export default PartnerInfo;
