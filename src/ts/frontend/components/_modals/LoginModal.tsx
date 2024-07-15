import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import "@scss/components/_modals/LoginModal.scss"
import { RootState } from '@store/ConfigureStore';
import { PAGE_PATHS } from "@common/Constants"
import LoginForm from "@components/_forms/LoginForm";
import Modal from "@components/_modals/_Modal";

const LoginModal = () => {
  const isAuthd = useSelector((state: RootState) => state.authState.isAuthd);

  /* if authorized, default to main folders page */
  if (isAuthd) {
    return <Navigate to={PAGE_PATHS.MAIN_FOLDERS} />
  }

  return (
    <Modal className="login-modal">
      <span>Please sign in.</span>
      <LoginForm />
    </Modal>
  );
};

export default LoginModal;
