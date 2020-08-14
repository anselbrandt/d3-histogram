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
  const [bins, setBins] = useState(100);
  const [cutoff, setCutoff] = useState(1500000);
  const [yScale, setYScale] = useState(50);
  const [data, setData] = useState();
  const [min, setMin] = useState();
  const [max, setMax] = useState();
  const [histogram, setHistogram] = useState();
  const [highCount, setHighCount] = useState();

  useEffect(() => {
    csv("/prices.csv").then((data) => {
      const raw = data.map((value) => +Object.values(value)[0]);
      setData(raw);
      const minima = getMin(raw);
      const maxima = getMax(raw);
      setMin(minima);
      setMax(maxima);
    });
  }, []);

  useEffect(() => {
    if (data && bins && cutoff) {
      const hist = getHistogram(data, bins, cutoff);
      setHistogram(hist);
      const high = Math.max(...hist.map((value) => value.count));
      setHighCount(high);
    }
  }, [data, bins, cutoff]);

  const handleSetBins = (event) => {
    const value = event.target.value;
    setBins(+value);
  };

  const handleSetCutoff = (event) => {
    const value = event.target.value;
    setCutoff(+value * 100000);
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
        bins={bins}
        data={histogram}
        cutoff={cutoff}
        highCount={highCount}
      />
      <div className={styles.container}>
        <Controls
          bins={bins}
          cutoff={cutoff}
          yScale={yScale}
          handleSetBins={handleSetBins}
          handleSetCutoff={handleSetCutoff}
          handleSetYScale={handleSetYScale}
        />
        <Info
          data={data}
          min={min}
          max={max}
          cutoff={cutoff}
          bins={bins}
          highCount={highCount}
          histogram={histogram}
        />
      </div>
    </div>
  );
}

export default App;
