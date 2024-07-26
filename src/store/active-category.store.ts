import { create } from "zustand";

interface ActiveCategoryState {
  activeTitle: string;
  setActiveTitle: (activeTitle: string) => void;
}

export const useActiveCategoryState = create<ActiveCategoryState>()((set) => ({
  activeTitle: "",
  setActiveTitle: (activeTitle: string) => set({ activeTitle }),
}));
