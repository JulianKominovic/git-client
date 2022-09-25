import React, { useEffect } from "react";
import BranchesTable from "./BranchTable";

type Props = {
  toast: any;
};

const Branches = ({ toast }: Props) => {
  return (
    <div
      style={{
        padding: "20px",
      }}
    >
      <BranchesTable toast={toast} />
    </div>
  );
};

export default Branches;
