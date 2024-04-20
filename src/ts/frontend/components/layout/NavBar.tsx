import "@scss/components/layout/NavBar.scss";
import UserProfile from "@components/userProfile/UserProfile";
import HamburgerMenu from "@components/hamburgerMenu/HamburgerMenu";

const NavBar = () => {
  return (
    <div className="nav-bar">
      <HamburgerMenu />
      <UserProfile />
    </div>
  );
};

export default NavBar;
