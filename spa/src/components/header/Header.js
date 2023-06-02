import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import SVGUtils from "../../utils/SVGUtils";
import "./Header.css";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const email = localStorage.getItem("email");

  const headerRef = useRef(null);

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  const handleClickOutside = (event) => {
    if (headerRef.current && !headerRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  function handleLogoClick() {
    navigate("/home");
  }
  let profileCharacter =
    email === undefined || email === null ? "N" : email.charAt(0).toUpperCase();
  return (
    <div className="header-container">
      <div className="navigation-container">
        <div className="left-navigation-container">
          <div className="logo-container" onClick={handleLogoClick}>
            <div className="logo">
              <SVGUtils name="logo" />
            </div>
            <div className="sitetitle">Forms Express</div>
          </div>
        </div>

        <div className="right-navigation-container">
          <div className="header-menu" ref={headerRef}>
            <div className="profile-icon-container" onClick={toggleMenu}>
              <button className="header-profile-btn">
                <div id="profileImage"> {profileCharacter} </div>
                <span className="header-profile-arrow">&#9660;</span>
              </button>
              {isMenuOpen && (
                <ul className="header-profile-menu">
                  <li className="header-profile-menu-item">
                    <Link to="/">My Forms</Link>{" "}
                  </li>
                  <li
                    className="header-profile-menu-item"
                    onClick={handleLogout}
                  >
                    Logout
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
