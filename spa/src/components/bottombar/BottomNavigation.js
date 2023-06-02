import React, { useEffect, useRef, useState } from "react";
import "./BottomNavigation.css";
import SVGUtils from "../../utils/SVGUtils";
import { useNavigate } from "react-router-dom";

const BottomNavigation = ({ onAddElement }) => {
  const navigate = useNavigate();
  const [showOptions, setShowOptions] = useState(false);
  const optionsRef = useRef(null);
  const elements = ["Text", "Email", "Select", "Textarea", "Radio", "Checkbox"];

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleOptionClick = (elementOption) => {
    setShowOptions(false);
    onAddElement(elementOption.toLowerCase());
  };

  const handleClickOutside = (event) => {
    if (optionsRef.current && !optionsRef.current.contains(event.target)) {
      setShowOptions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleHomeButtonClick = () => {
    navigate("/home");
  };

  const myFormsButtonClick = () => {
    navigate("/home");
  };

  return (
    <div className="bottom-navigation-container">
      {/* Bottom Navigation */}
      <div className="bottom-navigation">
        <button className="nav-item" onClick={handleHomeButtonClick}>
          <SVGUtils name="MobileHome" />
        </button>
        <button className="nav-item create-plus-button" onClick={toggleOptions}>
          <SVGUtils name="MobileAdd" />
        </button>
        <button className="nav-item" onClick={handleHomeButtonClick}>
          <SVGUtils name="MobileForms" />
        </button>
      </div>

      {/* Options Panel */}
      {showOptions && (
        <div className="options-panel" ref={optionsRef}>
          {elements.map((element, index) => {
            return (
              <button
                key={index}
                className="option-item"
                onClick={() => handleOptionClick(element)}
              >
                <SVGUtils name={element} /> {element}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default BottomNavigation;
