import { useEffect, useState } from "react";
import { Column, ColumnFilterElementType } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { FilterMatchMode } from "primereact/api";
import getBranches from "../../../actions/api/branch/getBranches";
import { Branch } from "../../../types/branch";
import branchParser from "../utils/branchParser";
import { Chip } from "primereact/chip";
import { MultiSelect } from "primereact/multiselect";
import { Button } from "primereact/button";

import useCWD from "../../../actions/currentWorkingDirectory";
import GitflowBadge from "./GitflowTypeBadge";

const statusBodyTemplate = (rowData: Branch) => {
  return <span>{rowData.label}</span>;
};

const originType = (rowData: Branch) => {
  const isRemote = rowData.origin === "REMOTE";
  return (
    <Chip
      className={isRemote ? "origin__remote" : "origin__local"}
      label={rowData.origin}
      icon={`pi ${isRemote ? "pi-github" : "pi-desktop"}`}
    />
  );
};

const header = (
  <div style={{ textAlign: "left" }}>
    <Button
      type="button"
      icon="pi pi-external-link"
      iconPos="left"
      label="CSV"
      onClick={() => console.log("click")}
    ></Button>
  </div>
);

const GitflowTypeSelect = (options: ColumnFilterElementType) => (
  <MultiSelect
    style={{
      maxWidth: "200px",
      minWidth: "200px",
    }}
    optionLabel="name"
    value={options.value || null}
    options={[
      {
        name: "FEATURE",
        value: "FEATURE",
      },
      {
        name: "HOTFIX",
        value: "HOTFIX",
      },
      {
        name: "RELEASE",
        value: "RELEASE",
      },
      {
        name: "BUGFIX",
        value: "BUGFIX",
      },
      {
        name: "UNKNOWN",
        value: "UNKNOWN",
      },
    ]}
    itemTemplate={(options) => <GitflowBadge gitflowType={options.value} />}
    onChange={(e) => options.filterApplyCallback(e.value)}
  />
);
const BranchesTable = () => {
  const [branches, setBranches] = useState<Branch[]>([]);

  const cwd = useCWD((state) => state.cwd);

  useEffect(() => {
    getBranches()?.then((res) =>
      setBranches(
        Object.entries(res.branches as any).map(
          ([key, branch]: [key: any, branch: any]) => {
            return branchParser({
              key,
              ...branch,
            });
          }
        )
      )
    );
  }, [cwd]);

  return (
    <>
      {branches?.length > 0 ? (
        <DataTable value={branches} header={header} filterDisplay="row">
          <Column field="key" header="Nombre"></Column>
          <Column
            field="gitflowType"
            header="Tipo/Gitflow"
            body={GitflowBadge}
            filterMatchMode="in"
            filter
            filterElement={GitflowTypeSelect}
            filterFunction={(value: Branch["gitflowType"], filter) => {
              if (!value || !filter) return true;
              return value.includes(filter);
            }}
          ></Column>
          <Column
            field="label"
            header="Label"
            body={statusBodyTemplate}
          ></Column>
          <Column
            field="origin"
            header="Localización"
            body={originType}
          ></Column>
        </DataTable>
      ) : null}
    </>
  );
};
export default BranchesTable;
