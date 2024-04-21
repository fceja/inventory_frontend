import { Dispatch } from "redux";

import { clearAuth, AuthActionT } from "@store/auth/AuthActions";

let logoutTimer: NodeJS.Timeout | null = null;

export const cancelLogoutTimeout = () => {
    if (logoutTimer) {
        clearTimeout(logoutTimer);
        logoutTimer = null;
    }
};

export const resetLogoutTimer = (dispatch: Dispatch<AuthActionT>) => {
    cancelLogoutTimeout();

    logoutTimer = setTimeout(() => {
        dispatch(clearAuth());
        console.log('Logged out for inactivity.')
    }, import.meta.env.VITE_LOGOUT_TIMER)
}
