import React, { useEffect } from "react";
import BranchesTable from "./BranchTable";

type Props = {};

const Branches = (props: Props) => {
  return (
    <div
      style={{
        padding: "20px",
      }}
    >
      <BranchesTable />
    </div>
  );
};

export default Branches;
