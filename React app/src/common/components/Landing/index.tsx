import React from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/Landing.module.css";
import MainBtn from "../MainBtn";
import LandingInfo from "../LandingInfo";
import Footer from "../Footer";
import Rectangle1 from "../../assets/Rectangle1.png";
import illustration1 from "../../assets/illustration1.png";

export default function Index(props: any) {
  const onClick = props.onClick;
  return (
    <div>
      {/* Sense 
            Landing page here
            <Link href="/Capture" passHref>
                <button> Go to Capture</button>
            </Link> */}

      <>
        <div className={styles.hero__Section}>
          <div className={styles.hero__inner}>
            <div className={styles.stripe}>
              <img src={Rectangle1} className={styles.rectangle1} alt="" />
              <img src={Rectangle1} className={styles.rectangle2} alt="" />
            </div>
            <div className={styles.main}>
              <h2 className={styles.title}>Sense</h2>
              <img src={illustration1} className={styles.illustartion} alt="" />
              <p className={styles.landing__info}>
                Smart AI driven outfit recommendation engine
              </p>
              <MainBtn onClick={onClick} />
            </div>
          </div>
        </div>

        <div>
          <LandingInfo />
        </div>

        <Footer />
      </>
    </div>
  );
}
