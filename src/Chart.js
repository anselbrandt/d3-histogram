import React, { useEffect, useState } from "react";
import styles from "./Chart.module.css";
import { select, scaleBand, scaleLinear, axisBottom, axisRight } from "d3";

export default function Chart(props) {
  const { svgRef, width, height } = props;

  const [data, setData] = useState([
    { count: 250 },
    { count: 300 },
    { count: 450 },
    { count: 600 },
    { count: 100 },
    { count: 650 },
    { count: 750 },
  ]);

  useEffect(() => {
    const svg = select(svgRef.current);

    if (data) {
      const xScale = scaleBand()
        .domain(data.map((value, index) => index))
        .range([0, width])
        .padding(0.5);

      const yScale = scaleLinear().domain([0, 750]).range([height, 0]);

      const colorScale = scaleLinear()
        .domain([height * 0.5, height * 0.6, height])
        .range(["green", "orange", "red"])
        .clamp(true);

      const xAxis = axisBottom(xScale).ticks(data.length);

      svg
        .select(".x-axis")
        .style("transform", `translateY(${height}px)`)
        .call(xAxis);

      const yAxis = axisRight(yScale);
      svg
        .select(".y-axis")
        .style("transform", `translateX(${width}px)`)
        .call(yAxis);

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
