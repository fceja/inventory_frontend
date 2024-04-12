import { Route, Routes } from "react-router-dom";

import "@scss/App.scss";
import Dashboard from "@pages/DashboardPage";
import FolderPage from "@pages/FolderPage";
import InventoryPage from "@pages/InventoryPage";
import ItemPage from "@pages/ItemPage";
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
        path="/folders/:folderId?"
        element={
          <Layout>
            <FolderPage />
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
        path="/items/:itemId"
        element={
          <Layout>
            <ItemPage />
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