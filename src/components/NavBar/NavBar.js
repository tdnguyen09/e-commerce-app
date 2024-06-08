import React from "react";
import "./NavBar.css";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import shoppingCart from "./shopping-cart.svg";
import userLogo from "./user.svg";
import wishlist from "./wishlist.svg";
import searchIcon from "./search.png";

function NavBar() {
    return (
        <div className="navbar">
            <div id="navbar1">
                <div className="navbar-left">
                    <NavLink to="/">Shop</NavLink>
                </div>
                <div className="navbar-middle">
                    <img src={searchIcon} alt="search-icon" className="icon"/>
                    <input type="text" name="serach-input" id="serach-input"/>
                </div>
                <div className="navbar-right">
                    <NavLink to="/cart">
                        <img src={shoppingCart} alt="shopping-cart" className="icon"/>
                    </NavLink>
                    <NavLink to="/login">
                        <img src={userLogo} alt="user-logo" className="icon"/>
                    </NavLink>
                    <NavLink to="/wishlist">
                        <img src={wishlist} alt="wishlist" className="icon"/>
                    </NavLink>
                </div>
            </div>
            <div id="navbar2">
                <NavLink to="/products" className="navbar-section">ALL</NavLink>
                <NavLink to="/albums" className="navbar-section">Albums</NavLink>
                <NavLink to="/preorders" className="navbar-section">Pre-Order</NavLink>
                <NavLink to="/goods" className="navbar-section">MD/Goods</NavLink>
                <NavLink to="/clearance" className="navbar-section">Clearance</NavLink>
            </div>
        </div>
    )
}


export default NavBar;