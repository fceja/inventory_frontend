import { Route, Routes } from "react-router-dom";

import "@scss/App.scss";
import { PAGE_PATHS } from "@common/Constants"
import Dashboard from "@pages/DashboardPage";
import FolderPage from "@pages/FolderPage";
import ItemPage from "@pages/ItemPage";
import Layout from "@pages/Layout";
import NotFoundPage from "@pages/NotFoundPage";
import UpdatePage from "@pages/UpdatePage";
import { validateAndDispatchFolderRoute } from "@validations/ValidateFoldersParams"

const FolderRoute = () => {
  const isValid = validateAndDispatchFolderRoute()

  return (
    <Layout>
      {!isValid ? <NotFoundPage /> : <FolderPage />}
    </Layout>
  )
}

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
          <FolderRoute />
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