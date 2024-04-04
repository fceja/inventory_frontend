import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { cancelLogoutTimeout, resetLogoutTimer } from "@utils/frontend/LoggerTimeout"
import { RootState } from "@store/ConfigureStore";
import NavBar from "@components/navBar/NavBar";
import LoginModal from "@components/_modals/LoginModal";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const dispatch = useDispatch();
  const isAuthd = useSelector((state: RootState) => state.authState.isAuthd);

  useEffect(() => {
    if (isAuthd) {
      const logoutTimoutHandler = () => {
        resetLogoutTimer(dispatch);
      }

      document.addEventListener('mousemove', logoutTimoutHandler);
      document.addEventListener('keydown', logoutTimoutHandler);

      return () => {
        document.removeEventListener('mousemove', logoutTimoutHandler);
        document.removeEventListener('keydown', logoutTimoutHandler);
      }
    } else {
      cancelLogoutTimeout()
      return;
    }

  }, [isAuthd])

  return (
    <div className="page-layout">
      <NavBar />
      {!isAuthd ? <LoginModal /> : children}
    </div>
  );
};

export default Layout;
