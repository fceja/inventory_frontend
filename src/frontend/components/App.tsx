import { Route, Routes } from "react-router-dom";

import "@scss/App.scss";
import { PAGE_PATHS } from "@common/Constants"
import Dashboard from "@pages/DashboardPage";
import FolderPage from "@pages/FolderPage";
import ItemPage from "@pages/ItemPage";
import Layout from "@pages/Layout";
import NotFoundPage from "@pages/NotFoundPage";
import UpdatePage from "@pages/UpdatePage";

const App = () => {
  return (
    <Routes>
      <Route
        path={PAGE_PATHS.DASHBOARD}
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
        path="/item/:itemId"
        element={
          <Layout>
            <ItemPage />
          </Layout>
        }
      ></Route>
      <Route
        path={PAGE_PATHS.UPDATE}
        element={
          <Layout>
            <UpdatePage />
          </Layout>
        }
      ></Route>
      <Route
        path={PAGE_PATHS.NOT_FOUND}
        element={
          <Layout>
            <NotFoundPage />
          </Layout>
        }
      ></Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;