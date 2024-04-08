import { Route, Routes } from "react-router-dom";

import "@scss/App.scss";
import Dashboard from "@pages/DashboardPage";
import FolderItemsPage from "@pages/FolderItemsPage";
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
            <Dashboard />
          </Layout>
        }
      ></Route>
      <Route
        path="/folderItems"
        element={
          <Layout>
            <FolderItemsPage />
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