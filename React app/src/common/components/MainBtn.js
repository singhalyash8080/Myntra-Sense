import React from "react";
import styles from "../../styles/Landing.module.css";

const MainBtn = ({ onClick }) => {
  return (
    <button className={styles.landing_btn} onClick={onClick}>
      Start exploring
    </button>
  );
};

export default MainBtn;
