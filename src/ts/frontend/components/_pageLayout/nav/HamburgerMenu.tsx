import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import "@scss/components/_pageLayout/nav/HamburgerMenu.scss"
import { PAGE_PATHS } from "@common/Constants"

const HamburgerMenu = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isMenuClicked, setIsMenuClicked] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  /* adds click listener if hamburger menu is visible */
  useEffect(() => {
    if (isMenuClicked) {
      document.addEventListener("click", handleClickOutsideMenu, true);
    }

    return () => {
      document.removeEventListener("click", handleClickOutsideMenu, true);
    };
  }, [isMenuClicked]);

  /* update ham menu visibility */
  const handleHamMenuVisibility = () => {
    setIsMenuClicked(!isMenuClicked);
    setIsMenuVisible(!isMenuVisible)
  };

  /* handles closing of menu if clicked outside of menu container */
  const handleClickOutsideMenu = (event: MouseEvent) => {
    const targetNode = event.target as HTMLElement;

    /* if target is svg close icon, ignore since handled in handleHamMenuVisibility */
    if (targetNode.tagName.toLowerCase() === 'svg') {
      const useElement = targetNode.querySelector('use');
      if (useElement && useElement.getAttribute('xlink:href') === '#sym-path') {
        return;
      }
    }

    /* if target is outside of menu container, close menu */
    if (
      isMenuClicked &&
      menuRef.current &&
      !menuRef.current.contains(targetNode) /* excluded clicking within menu area */
    ) {
      handleHamMenuVisibility()
    }
  };

  return (
    <>
      <div className="ham-container">
        <div
          className={`ham-state${isMenuClicked ? " clicked" : ""}`}
          onClick={handleHamMenuVisibility}
        >
          <div className="ham-top-bot-lines">
            <span className="ham-top-line"></span>
            <span className="ham-bot-line"></span>
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
            onClick={handleHamMenuVisibility}
          >
            Dashboard
          </Link>
          <Link
            className="menu-link"
            to={PAGE_PATHS.MAIN_FOLDERS.replace(":folderId", "main")}
            onClick={handleHamMenuVisibility}
          >
            Folder Content
          </Link>
          <Link
            className="menu-link"
            to={PAGE_PATHS.SEARCH}
            onClick={handleHamMenuVisibility}
          >
            Search
          </Link>
        </div>
      )}
    </>
  );
};

export default HamburgerMenu;
