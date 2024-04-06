import React from "react";

import styles from "../styles/CustomFeedback.module.css";

const SuccessMessage = ({ message }) => {
  return (
    <div className={`${styles.feedback} ${styles.success}`}>
      <p>{message}</p>
    </div>
  );
};

const ErrorMessage = ({ message }) => {
  return (
    <div className={`${styles.feedback} ${styles.error}`}>
      <p>{message}</p>
    </div>
  );
};


export { SuccessMessage, ErrorMessage };