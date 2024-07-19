import { useSelector } from 'react-redux';

import "@scss/components/_pageLayout/nav/UserProfile.scss"
import { RootState } from '@store/ConfigureStore';
import Logout from "@components/_pageLayout/footer/Logout"

const UserProfile = () => {
  const isAuthd = useSelector((state: RootState) => state.authState.isAuthd);

  return (
    <div className="user-profile">
      <div className="user-img">
        {!isAuthd ? (
          <>
            {/* <a href="https://www.flaticon.com/free-icons/read-only" title="read only icons">Read only icons created by Freepik - Flaticon</a> */}
            <img src="/src/assets/icons/read-only.png" />
          </>
        ) : (
          <>
            {/* <a href="https://www.flaticon.com/free-icons/read-only" title="read only icons">Read only icons created by Freepik - Flaticon</a> */}
            <img src="/src/assets/icons/user.png" />
          </>
        )}
      </div>
      <Logout />
    </div>
  );
};

export default UserProfile;
