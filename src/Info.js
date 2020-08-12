import React from "react";
import styles from "./Info.module.css";

export default function Info() {
  return (
    <div className={styles.infoContainer}>
      <div>Info</div>
      <div>Dataset Size</div>
      <div>Min</div>
      <div>Max</div>
    </div>
  );
}
