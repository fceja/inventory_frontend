import LoginForm from "@components/forms/LoginForm";
import "@scss/components/modals/LoginModal.scss"
import Modal from "@components/modals/Modal";
import { setIsLoginModalOpen } from "@store/modal/ModalActions";

const LoginModal = () => {
  return (
    <Modal className="login-modal" dispatchCallBack={() => setIsLoginModalOpen(false)}>
      <span>Please sign in.</span>
      <LoginForm />
    </Modal>
  );
};

export default LoginModal;
