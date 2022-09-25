import { Route, Routes, BrowserRouter, useLocation } from "react-router-dom";
import { Home } from "./pages/home";
import { Navbar } from "./modules/navbar";
import { Branches } from "./pages/branches";
import { useEffect, useRef } from "react";
import TreeCommitGraph from "./modules/gittree";
import { ConfirmDialog } from "primereact/confirmdialog";
import { ConfirmPopup } from "primereact/confirmpopup";
import { Toast } from "primereact/toast";

function App() {
  const toast = useRef(null);

  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <TreeCommitGraph />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/branches" element={<Branches toast={toast} />} />
        <Route path="/commits" element={<Home />} />
        <Route path="/tags" element={<Home />} />
        <Route path="/config" element={<Home />} />
      </Routes>

      <ConfirmDialog />
      <ConfirmPopup />
      <Toast ref={toast} position="top-left" />
    </BrowserRouter>
  );
}

export default App;
