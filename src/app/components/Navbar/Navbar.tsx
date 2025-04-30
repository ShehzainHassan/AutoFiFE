import React from "react";
import Image from "next/image";
import classes from "./navbar.module.css";
import headings from "@/styles/typography.module.css";

export default function Navbar() {
  return (
    <div className={classes.navbar}>
      <Image
        src="/images/logo.png"
        className={classes.logo}
        alt="logo"
        width={108}
        height={26}
      />
      <div className={classes.navList}>
        <div className={classes.navContainer}>
          <h3 className={`${headings.navElement} ${classes.white}`}>Home</h3>
          <Image src="/images/expand.png" alt="expand" width={8} height={4} />
        </div>
        <div className={classes.navContainer}>
          <h3 className={`${headings.navElement} ${classes.white}`}>
            Listings
          </h3>
          <Image src="/images/expand.png" alt="expand" width={8} height={4} />
        </div>
        <div className={classes.navContainer}>
          <h3 className={`${headings.navElement} ${classes.white}`}>Blog</h3>
          <Image src="/images/expand.png" alt="expand" width={8} height={4} />
        </div>
        <div className={classes.navContainer}>
          <h3 className={`${headings.navElement} ${classes.white}`}>Pages</h3>
          <Image src="/images/expand.png" alt="expand" width={8} height={4} />
        </div>
        <h3 className={`${headings.navElement} ${classes.white}`}>About</h3>
        <h3 className={`${headings.navElement} ${classes.white}`}>Contact</h3>

        <div className={classes.navContainer}>
          <Image src="/images/person.png" alt="person" width={14} height={15} />
          <h3 className={`${headings.navElement} ${classes.white}`}>Sign In</h3>
        </div>
        <button className={`${headings.navElement} ${classes.navBtn}`}>
          Submit Listing
        </button>
      </div>
    </div>
  );
}
