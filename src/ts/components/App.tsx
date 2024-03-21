import { Route, Routes } from "react-router-dom";

import "../../scss/App.scss";
import HomePage from "../pages/HomePage";
import InventoryPage from "../pages/InventoryPage";
import UpdatePage from "../pages/UpdatePage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/inventory" element={<InventoryPage />}></Route>
      <Route path="/update" element={<UpdatePage />}></Route>
    </Routes>
  );
};

export default App;
