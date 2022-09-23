import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/tailwind-light/theme.css";
import "primeicons/primeicons.css";
import "./style.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <App />
);
