import { useDispatch } from "react-redux";
import { Dispatch } from "redux";

import "@scss/components/_pageLayout/nav/Logout.scss"
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
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
    )
}

export default Logout