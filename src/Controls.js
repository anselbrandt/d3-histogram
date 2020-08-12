import React from "react";
import styles from "./Controls.module.css";

export default function Controls(props) {
  const { inputOne, inputTwo, handleSetInputOne, handleSetInputTwo } = props;
  return (
    <div className={styles.controlsContainer}>
      <div>
        <input
          type="range"
          min={1}
          max={100}
          value={inputOne}
          onChange={handleSetInputOne}
        ></input>
        <div>Slider One</div>
        <div>{inputOne}</div>
      </div>
      <div>
        <input
          type="range"
          min={1}
          max={100}
          value={inputTwo}
          onChange={handleSetInputTwo}
        ></input>
        <div>Slider Two</div>
        <div>{inputTwo}</div>
      </div>
    </div>
  );
}
