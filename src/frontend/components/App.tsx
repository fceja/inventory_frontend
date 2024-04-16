import { Route, Routes } from "react-router-dom";

import "@scss/App.scss";
import Dashboard from "@pages/DashboardPage";
import FolderPage from "@pages/FolderPage";
import InventoryPage from "@pages/InventoryPage";
import ItemPage from "@pages/ItemPage";
import Layout from "@pages/Layout";
import NotFoundPage from "@pages/NotFoundPage";
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
        path="/folder/:folderId"
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
        path="/item/:itemId"
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
      <Route path="/folder/*" element={<NotFoundPage />} />
      <Route path="/item/*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;