import React, { useEffect } from "react";
import styles from "./Chart.module.css";
import { select, axisBottom, axisLeft, scaleLinear } from "d3";

export default function Chart(props) {
  const { svgRef, width, height, data } = props;
  const bins = 10;
  const cutoff = 10000000;

  useEffect(() => {
    if (data) {
      const svg = select(svgRef.current);

      const xScale = scaleLinear().domain([0, bins]).range([0, width]);
      const yScale = scaleLinear().domain([0, cutoff]).range([height, 0]);
      const xAxis = axisBottom(xScale).ticks(bins).tickFormat("tick");
      svg
        .select(`.${styles.xAxis}`)
        .style("transform", `translateY(${height}px)`)
        .call(xAxis)
        .attr("color", "gainsboro");
      const yAxis = axisLeft(yScale).ticks(10).tickFormat("tick");
      svg.select(`.${styles.yAxis}`).call(yAxis).attr("color", "gainsboro");
      svg.attr("width", `${width}px`).attr("height", `${height}px`);
    }
  }, [svgRef, width, height, data]);

  return (
    <div>
      <div className={styles.chartTitle}>Chart</div>
      <div>
        <svg
          className={styles.svg}
          ref={svgRef}
          style={{ width: width, height: height }}
        >
          <g className={styles.xAxis} />
          <g className={styles.yAxis} />
        </svg>
      </div>
    </div>
  );
}
