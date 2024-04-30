import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch } from 'react-redux';
import { Dispatch } from "redux";

import "@scss/components/modals/Modal.scss"
import { ModalActionT } from "@store/modal/ModalActions";

const Modal: React.FC<{
  className: string;
  children: any;
  dispatchCallBack: () => ModalActionT;
  modalType?: string | null;
  hasHeader?: boolean;
  headerOptions?: JSX.Element;
}> = ({ className, children, dispatchCallBack, modalType = null, hasHeader = false }) => {
  const dispatch: Dispatch<ModalActionT> = useDispatch();

  const [modalRootContainer, setModalRootContainer] = useState<null | HTMLDivElement>(null);
  const [isOptionsMenuOpen, setIsOptionsMenuOpen] = useState(false)

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

  const handleHeaderOptionsClick = () => {
    isOptionsMenuOpen ? setIsOptionsMenuOpen(false) : setIsOptionsMenuOpen(true)
  }


  if (!modalRootContainer) return null;

  return createPortal(
    <>
      <div className={`${className} shadow`}>
        {hasHeader && (
          <>
            <div className="modal-header">
              {modalType && (
                <div
                  className="header-options"
                >
                  {/**<!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->*/}
                  <svg
                    onClick={handleHeaderOptionsClick}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512">
                    <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
                  </svg>
                  {isOptionsMenuOpen &&
                    <div className="header-item-menu-options">
                      <ul>
                        <li onClick={() => { console.log('TODO - Edit') }}>Edit</li>
                        <li onClick={() => { console.log('TODO - Move') }}>Move</li>
                        <li onClick={() => { console.log('TODO - Delete') }}>Delete</li>
                        <li onClick={() => { setIsOptionsMenuOpen(false) }}>Close</li>
                      </ul>
                    </div>
                  }
                </div>
              )}

              <div
                className="modal-close"
                onClick={() => handleCloseClick(className)}
              >
                <div className="modal-close-bar"></div>
                <div className="modal-close-bar"></div>
              </div>


            </div>
          </>
        )}
        {children}
      </div>
    </>,
    modalRootContainer
  );
}

export default Modal;
