import React, { useContext, useEffect, useState, useRef } from "react";
import "./NavBar.css";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import shoppingCart from "./shopping-cart.svg";
import userLogo from "./user.svg";
import wishlist from "./wishlist.svg";
import searchIcon from "./search.png";
import { WebContext } from "../WebContext";
import ProductItem from "../ProductItem/ProductItem";
import logoutIcon from "./logout.svg"

function NavBar({ user, wishlistItems }) {
    const context = useContext(WebContext);
    const [inputSearch, setInputSearch] = useState('');
    const [isVisible, setIsVisible] = useState(false)
    console.log(context.allProducts)

    const totalItemWishlist = wishlistItems.length

    function handleFocus () {
        setIsVisible(true);
    }

    function handleBlur () {
        setTimeout(() => {
            setIsVisible(false)
            setInputSearch('')
        }, 200)
    }

    let searchResult = context.allProducts.filter(product => {
        return (
            inputSearch &&
            product &&
            product.name &&
            product.name.toLowerCase().includes(inputSearch.trim().toLowerCase())
        )
    }) 

    function handleSearchChange(e){
        setInputSearch(e.target.value)
    }

    return (
        <div className="navbar">
            <div id="navbar1">
                <div className="navbar-left">
                    <NavLink to="/">ATOK Shop</NavLink>
                </div>
                <div className="navbar-middle">
                    <div className="navbar-middle-top">
                        <img src={searchIcon} alt="search-icon" className="icon"/>
                        <input 
                        type="text" 
                        name="serach-input" 
                        id="search-input" 
                        onChange={handleSearchChange} 
                        value={inputSearch} 
                        onFocus={handleFocus}
                        onBlur={handleBlur} />
                    </div>
                    { isVisible && (
                    <div 
                        className="search-result-container"
                    >
                        {searchResult.map(searchProduct => (
                            <div className="search-item">
                                <ProductItem
                                id={searchProduct.id}
                                key={searchProduct.id}
                                image={searchProduct.image}
                                name={searchProduct.name}
                                price={searchProduct.price}
                                clearance={searchProduct.is_it_clearance}
                                onsale={searchProduct.is_it_onsale}
                                discount={searchProduct.discount} />
                            </div>
                        ))}
                    </div>
                    )}
                </div>
                <div className="navbar-right">
                    { user ? 
                    <NavLink to='/logout'>
                        <img src={logoutIcon} alt="logout" className="icon" />
                    </NavLink>
                    :<NavLink to="/login">
                        <img src={userLogo} alt="user-logo" className="icon"/>
                    </NavLink>
                    }
                    <NavLink to="/shopping-cart">
                        <img src={shoppingCart} alt="shopping-cart" className="icon"/>
                        <p>{context.totalQuantity()}</p>
                    </NavLink>
                    <NavLink to="/wishlist">
                        <img src={wishlist} alt="wishlist" className="icon"/>
                        {user && <p>{totalItemWishlist}</p>}
                    </NavLink>
                </div>
            </div>
            <div id="navbar2">
                <NavLink to="/products" className="navbar-section">All Products</NavLink>
                <NavLink to="/categories" className="navbar-section">Categories</NavLink>
                <NavLink to="/preorders" className="navbar-section">Pre-Orders</NavLink>
                <NavLink to="/clearance" className="navbar-section">Clearance</NavLink>
            </div>
        </div>
    )
}


export default NavBar;