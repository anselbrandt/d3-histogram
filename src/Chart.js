import React, { useEffect } from "react";
import styles from "./Chart.module.css";
import { select, scaleBand, scaleLinear, axisBottom, axisLeft } from "d3";

export default function Chart(props) {
  const { svgRef, width, height, bins, data, cutoff, highCount } = props;

  useEffect(() => {
    const svg = select(svgRef.current);

    const ticks = 4;

    if (data && highCount && bins && cutoff) {
      const xScale = scaleBand()
        .domain(data.map((value, index) => index))
        .range([0, width]);

      const yScale = scaleLinear().domain([0, highCount]).range([height, 0]);

      const xAxis = axisBottom(xScale)
        .tickValues(
          Array(ticks)
            .fill()
            .map((value, index) => (index + 1) * parseInt(bins / (ticks + 1)))
        )
        .tickFormat((tick) =>
          parseInt((tick * (cutoff / bins)) / 1000) < 999
            ? `$${parseInt((tick * (cutoff / bins)) / 1000)}k`
            : `$${(parseInt((tick * (cutoff / bins)) / 1000) / 1000).toFixed(
                2
              )}M`
        );
      svg
        .select(`.${styles.xAxis}`)
        .style("transform", `translateY(${height}px)`)
        .call(xAxis);

      const yAxis = axisLeft(yScale).ticks(5);
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
        .attr("fill", "tomato")
        .attr("height", (value) => height - yScale(value));
    }
  }, [svgRef, width, height, bins, data, cutoff, highCount]);

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
