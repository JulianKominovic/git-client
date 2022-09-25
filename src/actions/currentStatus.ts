import create from "zustand";
import { Branch } from "../types/branch";
import getBranches from "./api/branch/getBranches";
type currentStats = {
  currentBranch: string;
  setCurrentBranch: (currentBranch: string) => void;
  fetch?: any;
};
const useCurrentStatus = create<currentStats>((set) => ({
  currentBranch: "...",
  setCurrentBranch: (branch) => set(() => ({ currentBranch: branch })),
  fetch: async () => {
    const { current } = await getBranches();
    set({ currentBranch: current });
  },
}));
export default useCurrentStatus;
