import "@scss/components/_pageLayout/nav/_Nav.scss";
import HamburgerMenu from "@components/_pageLayout/nav/HamburgerMenu";
import useUserHasEditorRole from "@hooks/useUserHasEditorRole"
import UserProfile from "@components/_pageLayout/nav/UserProfile";

const Nav = () => {
  const isEditor = useUserHasEditorRole()

  return (
    <nav className="nav-bar">
      <HamburgerMenu />
      {!isEditor &&
        <span className="readonly-text">[ READ-ONLY]</span>
      }
      <UserProfile />
    </nav>
  );
};

export default Nav;
