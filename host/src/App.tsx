import { useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { mountRootParcel, type Parcel } from "single-spa";
function App() {
  const [count, setCount] = useState(0);
  const pocPluginRef = useRef<HTMLDivElement>(null);
  const currentParcel = useRef<Parcel | null>(null);

  function togglePlugin(): void {
    const url = "http://localhost:3000/plugin.js";

    if (pocPluginRef.current && !currentParcel.current) {
      // registerApplication({
      //   name: "poc-plugin",
      //   app: () => import(/* @vite-ignore */ url),
      //   activeWhen: () => true,
      //   customProps: {},
      // });

      const parcel = mountRootParcel(() => import(/* @vite-ignore */ url), {
        domElement: pocPluginRef.current,
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
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
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
        <div id="poc-plugin" ref={pocPluginRef}></div>
      </div>
    </>
  );
}

export default App;
