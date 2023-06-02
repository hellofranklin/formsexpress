import React from "react";
import "./SideBar.css";
import SVGUtils from "../../utils/SVGUtils";

function SideBar({ onAddElement }) {
  const elements = ["Text", "Email", "Select", "Textarea", "Radio", "Checkbox" ];
  return (
    <div className="sidebar-container">
      <div className="dropdown">
        <button className="dropbtn button-17">Add Question</button>
        <div className="dropdown-content">
          {elements.map((element, index) => {
            return (
              <button key={index} onClick={() => onAddElement(element.toLowerCase())}>
                  <SVGUtils name={element} />{" "} {element}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SideBar;
