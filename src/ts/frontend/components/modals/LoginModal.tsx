import LoginForm from "@components/forms/LoginForm";
import "@scss/components/modals/LoginModal.scss"
import Modal from "@components/modals/Modal";

const LoginModal = () => {

  return (
    <Modal className="login-modal">
      <span>Please sign in.</span>
      <LoginForm />
    </Modal>
  );
};

export default LoginModal;
