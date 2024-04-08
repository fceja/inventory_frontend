import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { RootState } from "@store/ConfigureStore";

const HamburgerMenu = () => {
  const isAuthd = useSelector((state: RootState) => state.authState.isAuthd);
  const [barClass, setBarClass] = useState("hamburger-bar unclicked");
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isMenuClicked, setIsMenuClicked] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  /* adds click listener if hamburger menu is opened */
  useEffect(() => {
    if (isMenuClicked) {
      document.addEventListener("click", handleClickOutsideMenu, true);
    } else {
      document.removeEventListener("click", handleClickOutsideMenu, true);
    }
  }, [isMenuClicked]);

  /* hides hamburger menu is not authd */
  useEffect(() => {
    if (!isAuthd) {
      setIsMenuVisible(false);
      setBarClass("hamburger-bar unclicked");
    }
  }, [isAuthd])

  /* update hamburger menu visibility */
  const updateMenuVisibility = () => {
    if (!isMenuClicked) {
      setIsMenuVisible(true);
      setBarClass("hamburger-bar clicked");
    } else {
      setIsMenuVisible(false);
      setBarClass("hamburger-bar unclicked");
    }
    setIsMenuClicked(!isMenuClicked);
  };

  /* handles closure of menu if clicked outside of menu container */
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

  return (
    <>
      <div className="hamburger-menu-container">
        <div
          className="hamburger-menu-bar-container"
          onClick={updateMenuVisibility}
        >
          <div className={barClass}></div>
          <div className={barClass}></div>
          <div className={barClass}></div>
        </div>
      </div>
      {isMenuVisible && (
        <div className="menu shadow" ref={menuRef}>
          <Link
            className="ham-menu-btn-link"
            to="/"
            onClick={updateMenuVisibility}
          >
            Dashboard
          </Link>
          <Link
            className="ham-menu-btn-link"
            to="/update"
            onClick={updateMenuVisibility}
          >
            Update
          </Link>
          <Link
            className="ham-menu-btn-link"
            to="/inventory"
            onClick={updateMenuVisibility}
          >
            Inventory
          </Link>
        </div>
      )}
    </>
  );
};

export default HamburgerMenu;
