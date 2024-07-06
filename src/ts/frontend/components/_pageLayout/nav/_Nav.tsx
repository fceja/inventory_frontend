import "@scss/components/_pageLayout/Nav.scss";
import UserProfile from "@components/_pageLayout/nav/UserProfile";
import HamburgerMenu from "@components/_pageLayout/nav/HamburgerMenu";

const Nav = () => {
  return (
    <nav className="nav-bar">
      <HamburgerMenu />
      <UserProfile />
    </nav>
  );
};

export default Nav;
