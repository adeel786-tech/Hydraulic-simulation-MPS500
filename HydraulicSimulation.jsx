import { useState, useEffect } from "react";

export default function HydraulicSimulation() {
  const [mode, setMode] = useState("idle");
  const [pressure, setPressure] = useState(0);
  const [accumulator, setAccumulator] = useState(0);
  const [framePos, setFramePos] = useState(0);

  useEffect(() => {
    let interval;
    if (mode === "grinding" && accumulator < 100) {
      interval = setInterval(() => {
        setAccumulator((prev) => Math.min(prev + 5, 100));
        setPressure((prev) => Math.min(prev + 5, 100));
      }, 300);
    } else if (mode === "release" && pressure > 0) {
      interval = setInterval(() => {
        setPressure((prev) => Math.max(prev - 5, 0));
      }, 300);
    } else if (mode === "lift" && framePos < 100) {
      interval = setInterval(() => {
        setFramePos((prev) => Math.min(prev + 5, 100));
      }, 300);
    } else if (mode === "lower" && framePos > 0) {
      interval = setInterval(() => {
        setFramePos((prev) => Math.max(prev - 5, 0));
      }, 300);
    }
    return () => clearInterval(interval);
  }, [mode, accumulator, pressure, framePos]);

  const resetSystem = () => {
    setMode("idle");
    setPressure(0);
    setAccumulator(0);
    setFramePos(0);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Hydraulic System Simulator</h2>
      <div style={{ marginBottom: 10 }}>
        <button onClick={() => setMode("grinding")}>Start Grinding</button>
        <button onClick={() => setMode("release")}>Pressure Release</button>
        <button onClick={() => setMode("lift")}>Lift Frame</button>
        <button onClick={() => setMode("lower")}>Lower Frame</button>
        <button onClick={resetSystem}>Reset</button>
      </div>
      <div>
        <p>Accumulator Pressure: {accumulator} bar</p>
        <progress max="100" value={accumulator}></progress>
        <p>Hydraulic Pressure: {pressure} bar</p>
        <progress max="100" value={pressure}></progress>
        <p>Frame Position: {framePos}%</p>
        <progress max="100" value={framePos}></progress>
      </div>
    </div>
  );
}
