import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';

import "@scss/components/loginPage/DemoLogin.scss"
import SystemAuthApi from "@api/SystemAuthApi";
import { setUserData, UserActionT } from "@store/user/UserActions"

const DemoLogin = () => {
    const dispatch: Dispatch<UserActionT> = useDispatch();

    const handleBtnClick = async () => {
        const password = import.meta.env.VITE_DEMO_PASSWORD
        const email = import.meta.env.VITE_DEMO_EMAIL

        const response = await SystemAuthApi().systemLogin({ email: email, password: password });
        const { userId, userRole } = response.data.userData

        dispatch(setUserData(userId, userRole))
        console.log("Demo login successful.");
    }
    return (
        <div id="peek-btn">
            <button onClick={handleBtnClick}>Take a peek</button>
        </div>
    )
}

export default DemoLogin