import { Route, Routes } from "react-router-dom";

import "@scss/components/App.scss";
import { PAGE_PATHS } from "@common/Constants"
import Dashboard from "@pages/DashboardPage";
import FolderPage from "@pages/FolderPage";
import ItemPage from "@pages/ItemPage";
import Layout from "@pages/Layout";
import NotFoundPage from "@pages/NotFoundPage";
import SearchPage from "@pages/SearchPage";
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
        path={PAGE_PATHS.FOLDERS}
        element={
          <Layout>
            <FolderPage />
          </Layout>
        }
      ></Route>
      <Route
        path={PAGE_PATHS.ITEMS}
        element={
          <Layout>
            <ItemPage />
          </Layout>
        }
      ></Route>
      <Route
        path={PAGE_PATHS.SEARCH}
        element={
          <Layout>
            <SearchPage />
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
      <Route path="*" element={
        <Layout>
          <NotFoundPage />
        </Layout>} />
    </Routes >
  );
};

export default App;