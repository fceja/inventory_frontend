import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import "@scss/components/_modals/Modal.scss"

interface ModalI {
  className: string
  children: any
}

const Modal = (props: ModalI) => {
  const [modalRootContainer, setModalRootContainer] = useState<null | HTMLDivElement>(null);
  const { className, children } = props

  const addRootDivToHtmlBody = () => {
    const div = document.createElement("div");
    div.id = `root-modal`;
    document.body.appendChild(div);

    setModalRootContainer(div)
  }

  const removeRootDivFromHtmlBody = () => {
    const div = document.getElementById(`root-modal`);
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
      <div id={`${className}`} className={`modal shadow`}>
        {children}
      </div>
    </>,
    modalRootContainer
  );
}

export default Modal;
