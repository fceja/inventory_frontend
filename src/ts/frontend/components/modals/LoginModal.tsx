import "@scss/components/modals/LoginModal.scss"
import Modal from "@components/modals/Modal";
import LoginForm from "@components/forms/LoginForm";

const LoginModal = () => {
  return (
    <Modal className="login-modal" isOpen={true}>
      <span>Please sign  in.</span>
      <LoginForm />
    </Modal>
  );
};

export default LoginModal;
