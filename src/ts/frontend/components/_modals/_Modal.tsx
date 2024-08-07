import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';

import "@scss/components/_modals/Modal.scss"
import { setIsFolderTreeModalOpen, ModalActionT } from "@store/modal/ModalActions";

interface ModalI {
  className: string
  children: any
}

const Modal = (props: ModalI) => {
  const { className, children } = props
  const dispatch: Dispatch<ModalActionT> = useDispatch();
  const [modalRootContainer, setModalRootContainer] = useState<null | HTMLDivElement>(null);

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
    document.body.classList.add("modal-open")

    return (() => {
      removeRootDivFromHtmlBody()
      document.body.classList.remove("modal-open")
    })
  }, [])

  const handleBackdropClick = () => {
    switch (className) {
      case 'login-modal':
        break

      case 'folder-tree-modal':
        dispatch(setIsFolderTreeModalOpen(false))
        break

      default:
        throw new Error('Invalid param.')

    }
  }

  if (!modalRootContainer) return null;

  return createPortal(
    <>
      <div className="modal-backdrop" onClick={handleBackdropClick}></div>
      <div id={`${className}`} className={`modal shadow`}>
        {children}
      </div>
    </>,
    modalRootContainer
  );
}

export default Modal;
