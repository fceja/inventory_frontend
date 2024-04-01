import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import "@scss/HamburgerMenu.scss";

const HamburgerMenu = () => {
  /* state variables */
  const [burgerClass, setBurgerClass] = useState("hamburger-bar unclicked");
  const [isMenuClicked, setIsMenuClicked] = useState(false);
  const [menuClass, setMenuClass] = useState("menu hidden");
  const menuRef = useRef<HTMLDivElement>(null);

  /* handles closure of menu if clicked outside menu container */
  const handleClickOutsideMenu = (event: MouseEvent) => {
    const targetNode = event.target as Node;

    if (
      isMenuClicked &&
      menuRef.current &&
      !menuRef.current.contains(targetNode) &&
      targetNode instanceof HTMLElement &&
      targetNode.className !==
        "hamburger-menu-bar-container" /* exclude since handled in onClick */ &&
      targetNode.className !==
        "hamburger-bar clicked" /* exclude since handled in onClick */
    ) {
      updateMenuVisibility();
    }
  };

  /* adds click listener if hamburger menu is opened */
  useEffect(() => {
    if (isMenuClicked) {
      document.addEventListener("click", handleClickOutsideMenu, true);
    } else {
      document.removeEventListener("click", handleClickOutsideMenu, true);
    }
  });

  /* update hamburger menu visibility */
  const updateMenuVisibility = () => {
    if (!isMenuClicked) {
      /* make visible */
      setBurgerClass("hamburger-bar clicked");
      setMenuClass("menu visible");
    } else {
      /* hide */
      setBurgerClass("hamburger-bar unclicked");
      setMenuClass("menu hidden");
    }
    setIsMenuClicked(!isMenuClicked);
  };

  const handleOnClick = () => {
    updateMenuVisibility();
  };

  return (
    <>
      <div className="hamburger-menu-container">
        <div
          className="hamburger-menu-bar-container"
          onClick={updateMenuVisibility}
        >
          <div className={burgerClass}></div>
          <div className={burgerClass}></div>
          <div className={burgerClass}></div>
        </div>
      </div>
      <div className={`${menuClass} shadow`} ref={menuRef}>
        <Link className="ham-menu-btn-link" to="/" onClick={handleOnClick}>
          Home
        </Link>
        <Link
          className="ham-menu-btn-link"
          to="/update"
          onClick={handleOnClick}
        >
          Update
        </Link>
        <Link
          className="ham-menu-btn-link ham-menu-btn-link-contact"
          to="/inventory"
          onClick={handleOnClick}
        >
          Inventory
        </Link>
      </div>
    </>
  );
};

export default HamburgerMenu;
