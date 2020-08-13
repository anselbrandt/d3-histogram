import React from "react";
import styles from "./Info.module.css";

export default function Info(props) {
  const { data, min, max } = props;
  return (
    <div className={styles.infoContainer}>
      <div>Size: {data ? data.length.toLocaleString() : null}</div>
      <div>Min: {min ? min.toLocaleString() : null}</div>
      <div>Max: {max ? max.toLocaleString() : null}</div>
    </div>
  );
}
