import { useRef } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { mountRootParcel, type Parcel } from "single-spa";
import { create } from "zustand";

interface State {
  count: number;
  increase: () => void;
}

const useStore = create<State>()((set) => ({
  count: 0,
  increase: () => set((state) => ({ count: state.count + 1 })),
}));

function App() {
  const { count, increase } = useStore();
  const pocPluginRef = useRef<HTMLDivElement>(null);
  const currentParcel = useRef<Parcel | null>(null);
  const url = "http://localhost:3000/plugin.js";

  function togglePlugin(): void {
    if (pocPluginRef.current && !currentParcel.current) {
      const parcel = mountRootParcel(() => import(/* @vite-ignore */ url), {
        name: "poc-plugin",
        domElement: pocPluginRef.current,
        customProps: {
          customprop: "custompropvalue",
          customcallback: () => console.log("hey its a callback"),
        },
      });
      currentParcel.current = parcel;
      console.log(parcel);
    } else {
      currentParcel.current?.unmount();
      currentParcel.current = null;
    }
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={increase}>count is {count}</button>
        <button onClick={() => togglePlugin()}>Toggle Plugin</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
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
