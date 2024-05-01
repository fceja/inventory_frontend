import { Route, Routes } from "react-router-dom";

import "@scss/components/App.scss";
import { PAGE_PATHS } from "@common/Constants"
import Dashboard from "@pages/DashboardPage";
import FolderContentPage from "@pages/FolderContentPage";
import ItemPage from "@pages/ItemPage";
import PageLayout from "@pages/PageLayout";
import NotFoundPage from "@pages/NotFoundPage";
import SearchPage from "@pages/SearchPage";
import UpdatePage from "@pages/UpdatePage";

const App = () => {
  return (
    <Routes>
      <Route
        path={PAGE_PATHS.DASHBOARD}
        element={
          <PageLayout>
            <Dashboard />
          </PageLayout>
        }
      ></Route>
      <Route
        path={PAGE_PATHS.FOLDERS}
        element={
          <PageLayout>
            <FolderContentPage />
          </PageLayout>
        }
      ></Route>
      <Route
        path={PAGE_PATHS.ITEMS}
        element={
          <PageLayout>
            <ItemPage />
          </PageLayout>
        }
      ></Route>
      <Route
        path={PAGE_PATHS.SEARCH}
        element={
          <PageLayout>
            <SearchPage />
          </PageLayout>
        }
      ></Route>
      <Route
        path={PAGE_PATHS.UPDATE}
        element={
          <PageLayout>
            <UpdatePage />
          </PageLayout>
        }
      ></Route>
      <Route
        path={PAGE_PATHS.NOT_FOUND}
        element={
          <PageLayout>
            <NotFoundPage />
          </PageLayout>
        }
      ></Route>
      <Route path="*" element={
        <PageLayout>
          <NotFoundPage />
        </PageLayout>} />
    </Routes >
  );
};

export default App;