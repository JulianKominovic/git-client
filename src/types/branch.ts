export type Branch = {
  current: boolean;
  linkedWorkTree: boolean;
  name: string;
  commit: string;
  label: string;
  key: string;
  origin: "LOCAL" | "REMOTE";
  gitflowType: "FEATURE" | "BUGFIX" | "RELEASE" | "HOTFIX" | "UNKNOWN";
};
