import create from "zustand";
type cwdState = {
  cwd: string;
  setCWD: (newCWD: string) => void;
};
const useCWD = create<cwdState>((set) => ({
  cwd: JSON.parse(localStorage.getItem("info") as any)?.cwd,
  setCWD: (newCWD: string) => set((state) => ({ cwd: newCWD })),
}));
export default useCWD;
