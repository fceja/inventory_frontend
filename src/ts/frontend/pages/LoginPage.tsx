import LoginModal from "@components/_modals/login/LoginModal";
import DemoLogin from "@components/loginPage/DemoLogin";

const LoginPage = () => {
    const demoMode = import.meta.env.VITE_DEMO_MODE

    return (
        <>
            {demoMode === "true" &&
                <DemoLogin />
            }
            <LoginModal />
        </>
    )
}
export default LoginPage