import React from 'react';
import {NavItem, NavLink} from "reactstrap";
import {NavLink as RouterNavLink} from "react-router-dom";

const AnonymousMenu = () => (
  <>
    <NavItem>
      <NavLink tag={RouterNavLink} to="/register" exact>Register</NavLink>
    </NavItem>
      <span> or </span>
    <NavItem>
      <NavLink tag={RouterNavLink} to="/login" exact>Login</NavLink>
    </NavItem>
  </>
);

export default AnonymousMenu;