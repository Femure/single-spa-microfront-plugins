import React, { useEffect } from "react";
import { CustomProps, ParcelProps } from "single-spa";
import { create } from "zustand";

interface BearState {
  count: number;
  increase: (by: number) => void;
}

const useBearStore = create<BearState>()((set) => ({
  count: 0,
  increase: () => set((state) => ({ count: state.count + 1 })),
}));

export default function App(
  props: ParcelProps & CustomProps & { name: string }
) {
  const { count, increase } = useBearStore();

  useEffect(() => {
    console.log("plugin custom props :", props.customProps);
  }, [props]);

  return (
    <div>
      <h3>Hello World from plugin</h3>
      <p>Count: {count}</p>
      <button onClick={increase}>Increment</button>
      <button onClick={() => props.customProps.customcallback()}>
        Call callback
      </button>
    </div>
  );
}
