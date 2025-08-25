import React from "react";
import { CustomProps, ParcelProps } from "single-spa";
import { create } from "zustand";

interface BearState {
  count: number;
  increase: (by?: number) => void;
}

const useBearStore = create<BearState>((set) => ({
  count: 0,
  increase: (by = 1) => set((state) => ({ count: state.count + by })),
}));

export default function Home(
  props: ParcelProps & CustomProps & { name: string }
) {
  const { count: bearCount, increase: increaseBear } = useBearStore();

  return (
    <div>
      <h3>Hello World from plugin</h3>
      <p>Count: {bearCount}</p>
      <div style={{ display: "flex", gap: "10px" }}>
        <button onClick={() => increaseBear()}>Increment local store</button>
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
