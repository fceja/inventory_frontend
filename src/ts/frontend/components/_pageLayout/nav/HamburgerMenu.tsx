import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import "@scss/components/_pageLayout/HamburgerMenu.scss"
import { PAGE_PATHS } from "@common/Constants"
import { RootState } from "@store/ConfigureStore";

const HamburgerMenu = () => {
  const isAuthd = useSelector((state: RootState) => state.authState.isAuthd);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isMenuClicked, setIsMenuClicked] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  /* adds click listener if hamburger menu is visible */
  useEffect(() => {
    if (isMenuClicked) {
      document.addEventListener("click", handleClickOutsideMenu, true);
    } else {
      document.removeEventListener("click", handleClickOutsideMenu, true);
    }
  }, [isMenuClicked]);

  /* hides hamburger menu if not authd */
  useEffect(() => {
    if (!isAuthd) { setIsMenuVisible(false) }
  }, [isAuthd])

  /* update hamburger menu visibility */
  const updateMenuVisibility = () => {
    if (!isMenuClicked) { setIsMenuVisible(true) }
    else { setIsMenuVisible(false); }

    setIsMenuClicked(!isMenuClicked);
  };

  /* handles closure of menu if clicked outside of menu container */
  const handleClickOutsideMenu = (event: MouseEvent) => {
    const targetNode = event.target as HTMLElement;

    if (
      isMenuClicked &&
      menuRef.current &&
      !menuRef.current.contains(targetNode) /* excluded clicking within menu area */
    ) { updateMenuVisibility() }
  };

  return (
    <>
      <div className="ham-menu-container">
        <div
          className={`ham ${isMenuClicked ? "clicked" : ""}`}
          onClick={updateMenuVisibility}
        >
          <div>
            <span ></span>
            <span></span>
          </div>
          <svg><use xlinkHref="#sym-path" /></svg>
          <svg><use xlinkHref="#sym-path" /></svg>
        </div>
      </ div>
      <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}>
        <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 44" id="sym-path">
          <path d="M22,22 L2,22 C2,11 11,2 22,2 C33,2 42,11 42,22" />
        </symbol>
      </svg>
      {isMenuVisible && (
        <div className="menu shadow" ref={menuRef}>
          <Link
            className="menu-link"
            to={PAGE_PATHS.DASHBOARD}
            onClick={updateMenuVisibility}
          >
            Dashboard
          </Link>
          <Link
            className="menu-link"
            to={PAGE_PATHS.FOLDERS.replace(":folderId", "main")}
            onClick={updateMenuVisibility}
          >
            Folder Content
          </Link>
          <Link
            className="menu-link"
            to={PAGE_PATHS.SEARCH}
            onClick={updateMenuVisibility}
          >
            Search
          </Link>
        </div>
      )}
    </>
  );
};

export default HamburgerMenu;
