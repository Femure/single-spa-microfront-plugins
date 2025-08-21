import { useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { mountRootParcel, type Parcel } from "single-spa";
import { create } from "zustand";

interface HostState {
  count: number;
  increase: () => void;
}

const useHostStore = create<HostState>()((set) => ({
  count: 0,
  increase: () => set((state) => ({ count: state.count + 1 })),
}));

function App() {
  const { count, increase } = useHostStore();
  const [hostCount, setHostCount] = useState(0);

  const pocPluginRef = useRef<HTMLDivElement>(null);
  const currentParcel = useRef<Parcel | null>(null);
  const url = "http://localhost:3000/poc-plugin.js";

  function togglePlugin(): void {
    if (pocPluginRef.current && !currentParcel.current) {
      const parcel = mountRootParcel(() => import(/* @vite-ignore */ url), {
        name: "poc-plugin",
        domElement: pocPluginRef.current,
        customProps: {
          customprop: "custompropvalue",
          customcallback: () => {
            setHostCount((prev) => prev + 1);
          },
          customstorecallback: () => {
            increase();
          },
          getStore: useHostStore.getState(),
        },
      });
      currentParcel.current = parcel;
    } else {
      currentParcel.current?.unmount();
      currentParcel.current = null;
    }
  }

  return (
    <>
      <div>
        <a>
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a>
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div style={{ display: "flex", gap: "10px" }}>
        <button onClick={() => setHostCount((prev) => prev + 1)}>
          count is {hostCount}
        </button>
        <button onClick={increase}>zustand count is {count}</button>
        <button onClick={() => togglePlugin()}>Toggle Plugin</button>
      </div>
      <div
        style={{
          border: "2px dashed #ccc",
          padding: "10px",
          marginTop: "20px",
          minHeight: "100px",
        }}
      >
        <div id="poc-plugin-container" ref={pocPluginRef} />
      </div>
    </>
  );
}

export default App;
