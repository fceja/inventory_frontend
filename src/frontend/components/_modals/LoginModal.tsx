import ModalOverlay from "@components/_modals/ModalOverlay";
import LoginForm from "@components/_forms/LoginForm";

const LoginModal = () => {
  return (
    <ModalOverlay isOpen={true}>
      <LoginForm />
    </ModalOverlay>
  );
};

export default LoginModal;
