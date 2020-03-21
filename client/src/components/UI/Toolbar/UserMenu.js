import React from 'react';
import {NavItem, NavLink} from "reactstrap";
import {NavLink as RouterNavLink} from "react-router-dom";

const UserMenu = ({user, logout}) => (
    <>
        <span>Hello, {user.displayName}!</span>
        <NavItem>
            <NavLink tag={RouterNavLink} to="/products/new" exact>Add New Product</NavLink>
        </NavItem>
        <NavItem>
            <NavLink onClick={logout}>Logout</NavLink>
        </NavItem>
    </>
);

export default UserMenu;