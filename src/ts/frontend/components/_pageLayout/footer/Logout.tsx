import { useDispatch } from "react-redux";
import { Dispatch } from "redux";

import "@scss/components/_pageLayout/nav/Logout.scss"
import { clearAuth, AuthActionT } from "@store/auth/AuthActions";
import { setIsLoginModalOpen, ModalActionT } from "@store/modal/ModalActions";
import { cancelLogoutTimeout } from "@utils/store/LogoutUtils"
import { clearUserData, UserActionT } from "@store/user/UserActions"

const Logout = () => {
    const dispatch: Dispatch<AuthActionT | ModalActionT | UserActionT> = useDispatch();

    const handleLogout = () => {
        dispatch(clearAuth());
        dispatch(clearUserData())
        dispatch(setIsLoginModalOpen(true))
        cancelLogoutTimeout()
    }

    return (
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
    )
}

export default Logout