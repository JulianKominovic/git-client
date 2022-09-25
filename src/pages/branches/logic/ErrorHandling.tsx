import React from "react";
import {
  confirmDialog,
  ConfirmDialog,
  ConfirmDialogOptions,
  ConfirmDialogTemplateType,
} from "primereact/confirmdialog"; // To use confirmDialog method
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import {
  ConfirmPopup,
  confirmPopup,
  ConfirmPopupOptions,
} from "primereact/confirmpopup"; // To use confirmPopup method
import stash from "../../../actions/api/workspace/stash";
import checkout from "../../../actions/api/workspace/checkout";
type Props = {
  error: string;
  toast?: any;
  failedRequest?: any;
  setReloadSignal?: React.Dispatch<React.SetStateAction<number>>;
};

const ERRORS = {
  COMMIT_OR_STAGE_CHANGES_BEFORE_CHECKOUT: {
    message:
      "Tenés cambios activos, elegí comitearlos o descartarlos antes de hacer checkout",
    footer: ({
      accept,
      reject,
      toast,
      failedRequest,
      setReloadSignal,
    }: ConfirmDialogOptions) => (
      <>
        <Button
          className="p-button-danger"
          icon="pi pi-trash mr-2"
          onClick={() => {
            stash()?.then((res) => {
              toast?.current?.show({
                severity: "success",
                summary: "Checkout realizado",
              });
              checkout({
                checkoutBranch: failedRequest.checkoutBranch,
              })?.finally(() => setReloadSignal((prev: number) => prev + 1));
              accept();
            });
          }}
        >
          Stash
        </Button>
        <Button
          onClick={(event) => {
            confirmPopup({
              target: event.currentTarget,
              message: "Que nombre le pones al commit?",
              icon: "pi pi-question",
              footer: ({ accept: localAccept }: ConfirmPopupOptions) => (
                <>
                  <form
                    style={{
                      padding: "8px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                    }}
                    action="#"
                    onSubmit={(e) => {
                      e.preventDefault();
                      console.log(
                        Object.fromEntries(
                          new FormData(e.target as HTMLFormElement)
                        )
                      );

                      localAccept();
                      accept();
                    }}
                  >
                    <InputText name="commitName" placeholder="#FEAT: testing" />
                    <Button
                      onClick={() => console.log("DO THE COMMIT")}
                      type="submit"
                    >
                      Commitear{" "}
                    </Button>
                  </form>
                </>
              ),
            });
          }}
        >
          Add all
        </Button>
      </>
    ),
  },
};

const chooseErrorMessage = (errorMessage: string) => {
  if (
    /.*Please commit your changes or stash them before you switch branches\..*/i.test(
      errorMessage
    )
  )
    return ERRORS.COMMIT_OR_STAGE_CHANGES_BEFORE_CHECKOUT;
};

const ErrorHandlingFunc = ({
  error,
  toast,
  failedRequest,
  setReloadSignal,
}: Props) => {
  if (!error) return;
  console.log(error);
  const errorChoosen = chooseErrorMessage(error);

  toast?.current?.show({
    severity: "error",
    summary: errorChoosen?.message,
  });

  return confirmDialog({
    message: errorChoosen?.message,
    header: "Error",
    icon: "pi pi-exclamation-triangle",
    footer: (options) =>
      errorChoosen?.footer({
        ...options,
        toast,
        failedRequest,
        setReloadSignal,
      }),
  });
};

export default ErrorHandlingFunc;
