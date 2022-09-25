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
import { Tag } from "primereact/tag";
import { BiLogInCircle } from "react-icons/bi";
import useCWD from "../../../actions/currentWorkingDirectory";
import GitflowBadge from "./GitflowTypeBadge";
import OriginTypeChip from "./OriginTypeChip";
import checkout from "../../../actions/api/workspace/checkout";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import ErrorHandlingFunc from "../logic/ErrorHandling";
import useCurrentStatus from "../../../actions/currentStatus";

const statusBodyTemplate = (rowData: Branch) => {
  return <span>{rowData.label}</span>;
};

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

const OriginTypeChipSelect = (options: ColumnFilterElementType) => (
  <MultiSelect
    style={{
      maxWidth: "200px",
      minWidth: "200px",
    }}
    optionLabel="name"
    value={options.value || null}
    options={[
      {
        name: "REMOTE",
        value: "REMOTE",
      },
      {
        name: "LOCAL",
        value: "LOCAL",
      },
    ]}
    itemTemplate={(options) => (
      <OriginTypeChip branch={{ origin: options.value }} />
    )}
    onChange={(e) => options.filterApplyCallback(e.value)}
  />
);

const BranchesTable = ({ toast }: { toast: any }) => {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [reloadSignal, setReloadSignal] = useState<number>(0);
  const setCurrentBranch = useCurrentStatus((state) => state.setCurrentBranch);
  const cwd = useCWD((state) => state.cwd);

  useEffect(() => {
    getBranches()?.then((res) => {
      setBranches(
        Object.entries(res.branches as any).map(
          ([key, branch]: [key: any, branch: any]) => {
            return branchParser({
              key,
              fullName: key,
              ...branch,
            });
          }
        )
      );
      setCurrentBranch(res.current);
    });
  }, [cwd, reloadSignal]);

  return (
    <>
      {branches?.length > 0 ? (
        <DataTable value={branches} filterDisplay="row" size="small">
          <Column
            className="branch-name-column"
            field="key"
            header="Nombre"
            filterFunction={(value: Branch["key"], filter) => {
              if (!value || !filter) return true;
              return new RegExp(filter).test(value);
            }}
            filter
            body={(row) => (
              <span>
                <span className="mr-2"> {row.key}</span>
                {row.current ? (
                  <Tag className="mr-2" severity="info" value="Actual" />
                ) : null}
              </span>
            )}
            filterMatchMode="custom"
          ></Column>
          <Column
            className="gitflow-column"
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
            className="branch-label-column"
            field="label"
            header="Label"
            body={statusBodyTemplate}
          ></Column>
          <Column
            className="branch-localization-column"
            field="origin"
            header="Localización"
            body={(rowData) => <OriginTypeChip branch={rowData} />}
            filterMatchMode="in"
            filter
            filterElement={OriginTypeChipSelect}
            filterFunction={(value: Branch["origin"], filter) => {
              if (!value || !filter) return true;
              return value.includes(filter);
            }}
          ></Column>
          <Column
            body={(row: Branch) => {
              return (
                <>
                  <Button
                    className="p-button-success"
                    onClick={() =>
                      checkout({
                        checkoutBranch: row.fullName,
                      })
                        ?.then(() => {
                          toast?.current?.show({
                            severity: "success",
                            summary: "Checkout realizado",
                          });
                          setReloadSignal((prev) => prev + 1);
                        })
                        .catch((err) => {
                          const failedRequestInfo = {
                            checkoutBranch: row.fullName,
                          };
                          ErrorHandlingFunc({
                            error: err,
                            toast,
                            failedRequest: failedRequestInfo,
                            setReloadSignal,
                          });
                        })
                    }
                  >
                    <BiLogInCircle className="mr-2"></BiLogInCircle>
                    Checkout
                  </Button>
                </>
              );
            }}
            exportable={false}
            style={{ minWidth: "8rem" }}
          ></Column>
        </DataTable>
      ) : null}
    </>
  );
};
export default BranchesTable;
