import React from "react";
import { Link } from "react-router-dom";
import NoResults from "../assets/no-results-icon.png";
import styles from "../styles/NotFound.module.css";
import Asset from "./Asset";

const NotFound = () => {
  return (
    <div className={styles.NotFound}>
      <Asset
        src={NoResults}
        message={`The page you're looking for doesn't exist`} />
        <Link to="/" className={styles.HomeLink}>Back to forum20 homepage</Link>
    </div>
  );
};

export default NotFound;
