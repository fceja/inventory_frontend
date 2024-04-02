import React from "react";
import { useSelector } from "react-redux";

import { RootState } from "@store/ConfigureStore";
import NavBar from "@components/navBar/NavBar";
import LoginModal from "@components/_modals/LoginModal";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const isAuthd = useSelector((state: RootState) => state.authState.isAuthd);

  return (
    <div className="page-layout">
      <NavBar />
      {!isAuthd ? <LoginModal /> : children}
    </div>
  );
};

export default Layout;
