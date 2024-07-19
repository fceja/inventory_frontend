import { Dispatch } from "redux";

import { clearAuth, AuthActionT } from "@store/auth/AuthActions";
import { setIsLoginModalOpen, ModalActionT } from "@store/modal/ModalActions";
import { clearUserData, UserActionT } from "@store/user/UserActions"

let logoutTimer: NodeJS.Timeout | null = null;

export const cancelLogoutTimeout = () => {
    if (logoutTimer) {
        clearTimeout(logoutTimer);
        logoutTimer = null;
    }
};

export const resetLogoutTimer = (dispatch: Dispatch<AuthActionT | ModalActionT | UserActionT>) => {
    cancelLogoutTimeout();

    logoutTimer = setTimeout(() => {
        dispatch(clearAuth());
        dispatch(clearUserData())
        dispatch(setIsLoginModalOpen(true));
        console.log('Logged out for inactivity.')
    }, import.meta.env.VITE_LOGOUT_TIMER)
}
