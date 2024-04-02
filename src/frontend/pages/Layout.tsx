import React, { useState } from "react";
import { createPortal } from "react-dom";
import ReactDOM from "react-dom";

import NavBar from "@components/navBar/NavBar";

interface LayoutProps {
  children: React.ReactNode;
}

const Modal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  children: any;
}> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal">
        <button className="modal-close" onClick={onClose}>
          Close
        </button>
        {children}
      </div>
    </div>,
    document.getElementById("modal-root")!,
  );
};

const Login: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div>
      <h2>Login</h2>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

const Layout = ({ children }: LayoutProps) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  return (
    <div className="page-layout">
      <NavBar />
      {children}
      <button onClick={openLoginModal}>Open Login Modal</button>
      <Modal isOpen={isLoginModalOpen} onClose={closeLoginModal}>
        <Login onClose={closeLoginModal} />
      </Modal>
    </div>
  );
};

export default Layout;
