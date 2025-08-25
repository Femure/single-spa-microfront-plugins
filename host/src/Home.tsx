import { useState } from "react";
import { useHostStore } from "./store";
import viteLogo from "/vite.svg";
import reactLogo from "./assets/react.svg";

export function Home() {
  const { count, increase } = useHostStore();
  const [hostCount, setHostCount] = useState(0);

  return (
    <>
      <div>
        <img src={viteLogo} className="logo" alt="Vite logo" />
        <img src={reactLogo} className="logo react" alt="React logo" />
      </div>
      <h1>Vite + React</h1>
      <div style={{ display: "flex", gap: "10px" }}>
        <button onClick={() => setHostCount((prev) => prev + 1)}>
          count is {hostCount}
        </button>
        <button onClick={increase}>zustand count is {count}</button>
      </div>
    </>
  );
}
