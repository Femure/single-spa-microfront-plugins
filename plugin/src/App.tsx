import React, { useEffect } from "react";
import { CustomProps, ParcelProps } from "single-spa";
import { create, StoreApi, UseBoundStore } from "zustand";

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
  const { count: bearCount, increase: increaseBear } = useBearStore();

  // useEffect(() => {
  //   // console.log("plugin custom props :", props.customProps);
  //   console.log(increaseStore);
  // }, [props]);

  return (
    <div>
      <h3>Hello World from plugin</h3>
      <p>Count: {bearCount}</p>
      <div style={{ display: "flex", gap: "10px" }}>
        <button onClick={increaseBear}>Increment local store</button>
        <button onClick={() => props.customProps.customcallback()}>
          Call callback
        </button>
        <button onClick={() => props.customProps.customstorecallback()}>
          Call store callback
        </button>
        <button onClick={() => props.customProps.getStore.increase()}>
          Increase store callback
        </button>
      </div>
    </div>
  );
}
