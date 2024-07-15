import { Navigate, Route, Routes } from "react-router-dom";

import "@scss/components/App.scss";
import { PAGE_PATHS } from "@common/Constants"
import LoginModal from "@components/_modals/LoginModal";
import DashboardPage from "@pages/DashboardPage";
import MainFoldersPage from "@pages/MainFoldersPage";
import PageLayout from "@pages/_PageLayout";
import NotFoundPage from "@pages/NotFoundPage";
import SearchPage from "@pages/SearchPage";
import ProtectedRoute from "@components/ProtectedRoute"

const App = () => {
  return (
    <Routes>
      {/* public routes */}
      <Route path="/*" element={<Navigate to={`${PAGE_PATHS.LOGIN}`} />} />
      <Route
        path={PAGE_PATHS.LOGIN}
        element={<LoginModal />}>
      </Route>
      <Route
        path={PAGE_PATHS.NOT_FOUND}
        element={<PageLayout children={<NotFoundPage />} />}>
      </Route>
      <Route
        path="*"
        element={<PageLayout children={<NotFoundPage />} />}>
      </Route>

      {/* protected routes, requires authentication */}
      <Route
        path={PAGE_PATHS.DASHBOARD}
        element={
          <ProtectedRoute protectedComponent={
            <PageLayout children={<DashboardPage />} />
          } />}>
      </Route>
      <Route
        path={PAGE_PATHS.MAIN_FOLDERS}
        element={
          <ProtectedRoute protectedComponent={
            <PageLayout children={<MainFoldersPage />} />
          } />
        }>
      </Route>
      <Route
        path={PAGE_PATHS.SEARCH}
        element={
          <ProtectedRoute protectedComponent={
            <PageLayout children={<SearchPage />} />
          } />
        }>
      </Route>
    </Routes >
  );
};

export default App;