import React, { useRef, useState, useEffect } from "react";
import styles from "./App.module.css";
import useGetViewport from "./useGetViewport";
import Chart from "./Chart";
import Controls from "./Controls";
import Info from "./Info";
import { csv } from "d3";
import { getMin, getMax, getHistogram } from "./utils";

function App() {
  const { width, height } = useGetViewport();
  const svgRef = useRef();
  const [bins, setBins] = useState(50);
  const [xScale, setXScale] = useState(50);
  const [yScale, setYScale] = useState(50);
  const [data, setData] = useState();
  const [min, setMin] = useState();
  const [max, setMax] = useState();
  const [histogram, setHistogram] = useState();

  useEffect(() => {
    csv("/prices.csv").then((data) => {
      const raw = data.map((value) => +Object.values(value)[0]);
      setData(raw);
      const minima = getMin(raw);
      const maxima = getMax(raw);
      setMin(minima);
      setMax(maxima);
      const hist = getHistogram(raw, 20, 10000000);
      setHistogram(hist);
      console.log(hist);
    });
  }, []);

  const handleSetBins = (event) => {
    const value = event.target.value;
    setBins(value);
  };
  const handleSetXScale = (event) => {
    const value = event.target.value;
    setXScale(value);
  };
  const handleSetYScale = (event) => {
    const value = event.target.value;
    setYScale(value);
  };

  return (
    <div className={styles.app}>
      <Chart
        width={width * 0.8}
        height={height * 0.5}
        svgRef={svgRef}
        data={data}
        min={min}
        max={max}
      />
      <div className={styles.gridContainer}>
        <Controls
          bins={bins}
          xScale={xScale}
          yScale={yScale}
          handleSetBins={handleSetBins}
          handleSetXScale={handleSetXScale}
          handleSetYScale={handleSetYScale}
        />
        <Info data={data} min={min} max={max} />
      </div>
    </div>
  );
}

export default App;
