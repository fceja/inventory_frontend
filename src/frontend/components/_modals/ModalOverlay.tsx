import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const ModalOverlay: React.FC<{
  isOpen: boolean;
  children: any;
}> = ({ isOpen, children }) => {
  const [modalRoot, setModalRoot] = useState<null | HTMLDivElement>(null);

  useEffect(() => {
    const div = document.createElement("div");
    div.id = "modal-root";
    document.body.appendChild(div);
    setModalRoot(div);

    return () => {
      document.body.removeChild(div);
    };
  }, []);

  if (!isOpen || !modalRoot) return null;

  return createPortal(
    <div className="modal-overlay">
      <div className="modal">{children}</div>
    </div>,

    modalRoot,
  );
};

export default ModalOverlay;
