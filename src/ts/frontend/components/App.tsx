import { Navigate, Route, Routes } from "react-router-dom";

import "@scss/components/App.scss";
import { PAGE_PATHS } from "@common/Constants"
import DashboardPage from "@pages/DashboardPage";
import MainFoldersPage from "@pages/MainFoldersPage";
import PageLayout from "@pages/_PageLayout";
import NotFoundPage from "@pages/NotFoundPage";
import SearchPage from "@pages/SearchPage";

const App = () => {
  return (
    <Routes>
      <Route path="/*" element={<Navigate to={`${PAGE_PATHS.FOLDERS}`} />} />
      <Route
        path={PAGE_PATHS.DASHBOARD}
        element={
          <PageLayout>
            <DashboardPage />
          </PageLayout>
        }
      ></Route>
      <Route
        path={PAGE_PATHS.FOLDERS}
        element={
          <PageLayout>
            <MainFoldersPage />
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