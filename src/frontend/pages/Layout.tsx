import React from "react";

import NavBar from "@components/navBar/NavBar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="page-layout">
      <NavBar />
      {children}
    </div>
  );
};

export default Layout;
