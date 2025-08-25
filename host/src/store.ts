import { create } from "zustand";

interface HostState {
  count: number;
  increase: () => void;
}

export const useHostStore = create<HostState>()((set) => ({
  count: 0,
  increase: () => set((state) => ({ count: state.count + 1 })),
}));