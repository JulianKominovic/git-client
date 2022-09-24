import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

type Props = {};

const TreeCommitGraph = (props: Props) => {
  const location = useLocation();
  console.log(location);
  useEffect(() => {
    const pathIsHomePath = location.pathname === "/";
    const graphContainer = document.querySelector("#graph");
    if (pathIsHomePath) {
      graphContainer?.setAttribute("triggerRender", Math.random() + "");
    }
    graphContainer.style = `display:${pathIsHomePath ? "block" : "none"};`;
  }, [location.pathname]);
  return null;
};

export default TreeCommitGraph;
