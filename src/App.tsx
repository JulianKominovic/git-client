import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Home } from "./pages/home";
import { Navbar } from "./modules/navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <Routes>
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
