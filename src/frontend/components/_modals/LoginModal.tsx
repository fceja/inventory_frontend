import "@scss/components/modals/LoginModal.scss"
import Modal from "@components/_modals/Modal";
import LoginForm from "@components/_forms/LoginForm";

const LoginModal = () => {
  return (
    <Modal className="login-modal" isOpen={true}>
      <LoginForm />
    </Modal>
  );
};

export default LoginModal;
