import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import "@scss/components/modals/Modal.scss"

const Modal: React.FC<{
  className: string;
  children: any;
  headerOptions?: JSX.Element;
}> = ({ className, children }) => {
  const [modalRootContainer, setModalRootContainer] = useState<null | HTMLDivElement>(null);

  const addRootDivToHtmlBody = () => {
    const div = document.createElement("div");
    div.id = `root-${className}`;
    document.body.appendChild(div);

    setModalRootContainer(div)
  }

  const removeRootDivFromHtmlBody = () => {
    const div = document.getElementById(`root-${className}`);
    if (div && div.parentNode) {
      div.parentNode.removeChild(div);
    }

    setModalRootContainer(null)
  }

  useEffect(() => {
    addRootDivToHtmlBody()

    return (() => removeRootDivFromHtmlBody())
  }, [])

  if (!modalRootContainer) return null;

  return createPortal(
    <>
      <div className={`${className} shadow`}>
        {children}
      </div>
    </>,
    modalRootContainer
  );
}

export default Modal;
