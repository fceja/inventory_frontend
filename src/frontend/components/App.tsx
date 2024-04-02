import { Route, Routes } from "react-router-dom";

import "@scss/App.scss";
import HomePage from "@pages/HomePage";
import InventoryPage from "@pages/InventoryPage";
import Layout from "@pages/Layout";
import UpdatePage from "@pages/UpdatePage";

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <HomePage />
          </Layout>
        }
      ></Route>
      <Route
        path="/inventory"
        element={
          <Layout>
            <InventoryPage />
          </Layout>
        }
      ></Route>
      <Route
        path="/update"
        element={
          <Layout>
            <UpdatePage />
          </Layout>
        }
      ></Route>
    </Routes>
  );
};

export default App;
