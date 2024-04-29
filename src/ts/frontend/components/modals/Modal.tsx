import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch } from 'react-redux';
import { Dispatch } from "redux";

import "@scss/components/modals/Modal.scss"
import { ModalActionT } from "@store/modal/ModalActions";

const Modal: React.FC<{
  className: string;
  isOpen?: boolean; // TODO - refactor out
  children: any;
  dispatchCallBack: () => ModalActionT
  hasHeader?: boolean;
}> = ({ className, isOpen, children, dispatchCallBack, hasHeader = false }) => {
  const dispatch: Dispatch<ModalActionT> = useDispatch();

  const [modalRootContainer, setModalRootContainer] = useState<null | HTMLDivElement>(null);

  const handleCloseClick = (className: string) => {
    dispatch(dispatchCallBack())


    const div = document.getElementById(`root-${className}`);
    if (div && div.parentNode) {
      div.parentNode.removeChild(div);
    }

    setModalRootContainer(null)
  };

  useEffect(() => {
    const div = document.createElement("div");
    div.id = `root-${className}`;
    document.body.appendChild(div);

    setModalRootContainer(div)

  }, [])


  if (!modalRootContainer) return null;

  return createPortal(
    <>
      <div className={`${className} shadow`}>
        {hasHeader && (
          <div className="modal-header">
            <div onClick={() => handleCloseClick(className)} className="modal-close">
              <div className="modal-close-bar"></div>
              <div className="modal-close-bar"></div>
            </div>
          </div>
        )}
        {children}
      </div>
    </>,
    modalRootContainer
  );
}

export default Modal;
