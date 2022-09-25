import React from "react";
import { Chip } from "primereact/chip";
import { Branch } from "../../../types/branch";

type Props = {
  branch: Branch | Partial<Branch>;
};

const OriginTypeChip = ({ branch }: Props) => {
  const isRemote = branch.origin === "REMOTE";

  return (
    <Chip
      className={isRemote ? "origin__remote" : "origin__local"}
      label={branch.origin}
      icon={`pi ${isRemote ? "pi-github" : "pi-desktop"}`}
    />
  );
};

export default OriginTypeChip;
