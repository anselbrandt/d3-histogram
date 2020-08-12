import React, { useRef, useState } from "react";
import styles from "./App.module.css";
import useGetViewport from "./useGetViewport";
import Chart from "./Chart";
import Controls from "./Controls";
import Info from "./Info";

function App() {
  const { width, height } = useGetViewport();
  const svgRef = useRef();
  const [inputOne, setInputOne] = useState(50);
  const [inputTwo, setInputTwo] = useState(50);

  const handleSetInputOne = (event) => {
    const value = event.target.value;
    setInputOne(value);
  };

  const handleSetInputTwo = (event) => {
    const value = event.target.value;
    setInputTwo(value);
  };

  return (
    <div className={styles.app}>
      <Chart width={width} height={height} svgRef={svgRef} />
      <div className={styles.gridContainer}>
        <Controls
          inputOne={inputOne}
          inputTwo={inputTwo}
          handleSetInputOne={handleSetInputOne}
          handleSetInputTwo={handleSetInputTwo}
        />
        <Info />
      </div>
    </div>
  );
}

export default App;
