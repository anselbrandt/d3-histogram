import React, { useEffect } from "react";
import styles from "./Chart.module.css";
import { select, csv } from "d3";

export default function Chart(props) {
  const { svgRef, width, height } = props;

  useEffect(() => {
    const svg = select(svgRef.current);
    svg.attr("width", `${width * 0.8}px`).attr("height", `${height * 0.5}px`);
  }, [svgRef, width, height]);

  useEffect(() => {
    csv("/prices.csv").then((data) => {
      console.log(data.length);
    });
  }, []);
  return (
    <div>
      <div className={styles.chartTitle}>Chart</div>
      <div>
        <svg ref={svgRef}></svg>
      </div>
    </div>
  );
}