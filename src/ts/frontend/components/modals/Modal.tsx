import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import "@scss/components/modals/Modal.scss"

const Modal: React.FC<{
  className: string;
  isOpen: boolean;
  children: any;
}> = ({ className, isOpen, children }) => {
  const [modalRootContainer, setModalRootContainer] = useState<null | HTMLDivElement>(null);

  useEffect(() => {
    const div = document.createElement("div");
    div.id = `root-${className}`;
    document.body.appendChild(div);
    setModalRootContainer(div);

    return () => {
      document.body.removeChild(div);
    };
  }, []);

  if (!isOpen || !modalRootContainer) return null;

  return createPortal(
    <div className={`${className} shadow`}>{children}</div>,
    modalRootContainer,
  );
};

export default Modal;
