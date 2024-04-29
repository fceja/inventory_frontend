import { useDispatch } from "react-redux";
import { Dispatch } from "redux";

import { clearAuth, AuthActionT } from "@store/auth/AuthActions";
import { setIsLoginModalOpen, ModalActionT } from "@store/modal/ModalActions";
import { cancelLogoutTimeout } from "@utils/store/LogoutUtils"

const Logout = () => {
    const dispatch: Dispatch<AuthActionT | ModalActionT> = useDispatch();

    const handleLogout = () => {
        dispatch(clearAuth());
        dispatch(setIsLoginModalOpen(true))
        cancelLogoutTimeout()
    }

    return (
        <button onClick={handleLogout}>Logout</button>
    )
}

export default Logout