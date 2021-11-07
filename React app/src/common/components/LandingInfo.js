import React from "react";
import styles from "../../styles/Landing.module.css";
import one from "../assets/1.png";
import two from "../assets/2.png";
import three from "../assets/3.png";
// import Image from "next/image";

const LandingInfo = () => {
  return (
    <div className={styles.landing__content}>
      <p className={styles.landing__content_title}>
        Find the perfect match for your clothing in 3 easy steps
      </p>
      <p className={styles.landing__content_para}>
        <img src={one} className={styles.landing__content_img} alt="" />
        Click a picture of your clothing item
      </p>
      <p className={styles.landing__content_para}>
        <img src={two} className={styles.landing__content_img} alt="" />
        Choose from a wide variety of AI recommended items to match your outfit
      </p>
      <p className={styles.landing__content_para}>
        <img src={three} className={styles.landing__content_img} alt="" />
        Adjust filters to match your taste
      </p>
    </div>
  );
};

export default LandingInfo;
