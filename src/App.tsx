import { Route, Routes, BrowserRouter, useLocation } from "react-router-dom";
import { Home } from "./pages/home";
import { Navbar } from "./modules/navbar";
import { Branches } from "./pages/branches";
import { useEffect } from "react";
import TreeCommitGraph from "./modules/gittree";

function App() {
  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <TreeCommitGraph />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/branches" element={<Branches />} />
        <Route path="/commits" element={<Home />} />
        <Route path="/tags" element={<Home />} />
        <Route path="/config" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
