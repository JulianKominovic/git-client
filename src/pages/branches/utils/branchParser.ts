import { Branch } from "../../../types/branch";

export default (branch: Partial<Branch>): Branch => {
  const isRemote = branch.key?.startsWith("remotes/origin");
  const keyWithoutOriginType = isRemote
    ? branch.key?.replace("remotes/origin/", "")
    : branch.key;
  const gitflowType: any =
    /(feature|bugfix|hotfix|release)\//i
      .exec(keyWithoutOriginType as string)?.[1]
      ?.toUpperCase() || "UNKNOWN";

  const finalKey = gitflowType
    ? keyWithoutOriginType?.replace(new RegExp(gitflowType + "/", "i"), "")
    : keyWithoutOriginType;

  return {
    ...branch,
    key: finalKey,
    origin: isRemote ? "REMOTE" : "LOCAL",
    gitflowType: gitflowType,
  } as Branch;
};
