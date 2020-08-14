import React, { useEffect } from "react";
import styles from "./Chart.module.css";
import { select, scaleBand, scaleLinear, axisBottom, axisLeft } from "d3";

export default function Chart(props) {
  const { svgRef, width, height, data, highCount } = props;

  useEffect(() => {
    const svg = select(svgRef.current);

    if (data && highCount) {
      const xScale = scaleBand()
        .domain(data.map((value, index) => index))
        .range([0, width])
        .padding(0.5);

      const yScale = scaleLinear().domain([0, highCount]).range([height, 0]);

      const colorScale = scaleLinear()
        .domain([height * 0.5, height * 0.6, height])
        .range(["green", "orange", "red"])
        .clamp(true);

      const xAxis = axisBottom(xScale).ticks(data.length);

      svg
        .select(`.${styles.xAxis}`)
        .style("transform", `translateY(${height}px)`)
        .call(xAxis);

      const yAxis = axisLeft(yScale);
      svg.select(`.${styles.yAxis}`).call(yAxis);

      svg
        .selectAll(".bar")
        .data(data.map((value) => value.count))
        .join("rect")
        .attr("class", "bar")
        .style("transform", "scale(1, -1)")
        .attr("x", (value, index) => xScale(index))
        .attr("y", -height)
        .attr("width", xScale.bandwidth())
        .transition()
        .attr("fill", colorScale)
        .attr("height", (value) => height - yScale(value));
    }
  }, [svgRef, width, height, data, highCount]);

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
