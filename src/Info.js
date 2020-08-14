import React from "react";
import styles from "./Info.module.css";

export default function Info(props) {
  const { data, min, max, cutoff, bins, highCount, histogram } = props;
  return (
    <div className={styles.infoContainer}>
      <div>Size: {data ? data.length.toLocaleString() : null}</div>
      <div>Min: {min ? min.toLocaleString() : null}</div>
      <div>Max: {max ? max.toLocaleString() : null}</div>
      <div>Cutoff: {cutoff ? cutoff.toLocaleString() : null}</div>
      <div>Bins: {bins ? bins : null}</div>
      <div>Highest Count: {highCount ? highCount.toLocaleString() : null}</div>
      <div>Histogram</div>
      <div>Price: Count</div>
      <div>
        {histogram
          ? histogram.map((value, index) => (
              <div key={index}>
                {value.bin.toLocaleString()}: {value.count.toLocaleString()}
              </div>
            ))
          : null}
      </div>
    </div>
  );
}
