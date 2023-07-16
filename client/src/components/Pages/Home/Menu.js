// Menu.js
import React from "react";
// import styles from "./Menu.module.css";

const Menu = ({ onAnnotationClick }) => {
  return (
    <div className="menu">
      <button onClick={() => onAnnotationClick("about-me")}>About Me</button>
      <button onClick={() => onAnnotationClick("about-the-project")}>
        About The Project
      </button>
      <button onClick={() => onAnnotationClick("my-interests")}>
        My Interests
      </button>
    </div>
  );
};

export default Menu;
