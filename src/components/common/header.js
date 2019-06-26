import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const activeStyle = { color: "#F1582A" };

  return (
    <nav>
      <NavLink to="/" exact activeStyle={activeStyle}>
        Home
      </NavLink>
      {" | "}
      <NavLink to="/about" exact activeStyle={activeStyle}>
        About
      </NavLink>
      {" | "}
      <NavLink to="/courses" exact activeStyle={activeStyle}>
        Courses
      </NavLink>
    </nav>
  );
};

export default Header;
