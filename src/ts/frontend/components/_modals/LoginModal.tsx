import LoginForm from "@components/_forms/LoginForm";
import "@scss/components/_modals/LoginModal.scss"
import Modal from "@components/_modals/_Modal";

const LoginModal = () => {

  return (
    <Modal className="login-modal">
      <span>Please sign in.</span>
      <LoginForm />
    </Modal>
  );
};

export default LoginModal;
