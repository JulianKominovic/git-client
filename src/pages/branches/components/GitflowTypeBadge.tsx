import React from "react";
import {
  BiBug,
  BiTestTube,
  BiCloudUpload,
  BiTimer,
  BiConfused,
} from "react-icons/bi";
import { Branch } from "../../../types/branch";
import { Chip } from "primereact/chip";

type Props = {
  gitflowType: Branch["gitflowType"];
  style?: any;
  options?: any;
};

const GitflowBadge = ({ gitflowType, style, options }: Props) => {
  let gitflowTypeClassname: string;
  let icon: JSX.Element;

  switch (gitflowType) {
    case "BUGFIX":
      gitflowTypeClassname = "yellow";
      icon = <BiBug />;
      break;
    case "FEATURE":
      gitflowTypeClassname = "green";
      icon = <BiTestTube />;
      break;
    case "RELEASE":
      gitflowTypeClassname = "pink";
      icon = <BiCloudUpload />;
      break;
    case "HOTFIX":
      gitflowTypeClassname = "red";
      icon = <BiTimer />;
      break;

    default:
      gitflowTypeClassname = "gray";
      icon = <BiConfused />;
      break;
  }
  return (
    <Chip
      onClick={() => {
        options?.filterApplyCallback(gitflowType);
      }}
      style={style}
      className={gitflowTypeClassname}
      template={(props) => (
        <span className={gitflowTypeClassname + " chip-center"}>
          {icon} {gitflowType}{" "}
        </span>
      )}
    />
  );
};
export default GitflowBadge;
