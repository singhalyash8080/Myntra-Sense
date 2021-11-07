import React from "react";
import styles from "../../styles/Landing.module.css";
import { FaCoffee } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <span className={styles.footer__text}>
        Made with <FaCoffee className={styles.icon_style} />
        and <FaHeart className={styles.icon_style} style={{ color: "red" }} />
      </span>
    </div>
  );
};

export default Footer;
