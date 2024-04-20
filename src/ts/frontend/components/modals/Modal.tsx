import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const Modal: React.FC<{
  className: string;
  isOpen: boolean;
  children: any;
}> = ({ className, isOpen, children }) => {
  const [modalRoot, setModalRoot] = useState<null | HTMLDivElement>(null);

  useEffect(() => {
    const div = document.createElement("div");
    div.id = `root-${className}`;
    document.body.appendChild(div);
    setModalRoot(div);

    return () => {
      document.body.removeChild(div);
    };
  }, []);

  if (!isOpen || !modalRoot) return null;

  return createPortal(
    <div className={`${className} shadow`}>{children}</div>,
    modalRoot,
  );
};

export default Modal;
