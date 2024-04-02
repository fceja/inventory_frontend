import UserProfile from "@components/userProfile/UserProfile";
import HamburgerMenu from "@components/hamburgerMenu/HamburgerMenu";

import "@scss/NavBar.scss";

const NavBar = () => {
  return (
    <div className="nav-bar">
      <HamburgerMenu />
      <UserProfile />
    </div>
  );
};

export default NavBar;
