import { useDispatch } from "react-redux";
import { Dispatch } from "redux";

import { clearAuth, AuthActionT } from "@store/auth/authActions";

const Logout = () => {
    const dispatch: Dispatch<AuthActionT> = useDispatch();

    const handleLogout = () => {
        dispatch(clearAuth());

    }

    return (
        <button onClick={handleLogout}>Logout</button>
    )
}

export default Logout