import React from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import "./Footer.css"
import amex from "./logos/amex.svg";
import visa from "./logos/visa.svg";
import mastercard from "./logos/mastercard.svg";
import applepay from "./logos/apple-pay.svg";
import paypal from "./logos/paypal.svg";
import instagram from "./logos/instagram.svg";
import facebook from "./logos/facebook.svg";
import twitter from "./logos/x.svg";

function Footer () {
    return (
        <div className="footer">
            <div id="footer-top">
                <h3>Join Our Newletter</h3>
                <NavLink to="/sign-up" id="subscribe-button">Subscribe</NavLink>
            </div>
            <div id="footer-middle">
                <div id="footer-middle-left">
                    <NavLink to="policies/shipping-policy" className="policies-text">Shipping Policy</NavLink>
                    <NavLink to="policies/refund-policy" className="policies-text">Refund Policy</NavLink>
                    <NavLink to="policies/term-of-service" className="policies-text">Terms of Service</NavLink>
                    <NavLink to="policies/privacy-policy" className="policies-text">Privacy Policy</NavLink>
                </div>
                <div id="footer-middle-right">
                    <a href="https://www.instagram.com/" target="_blank">
                        <img src={instagram} alt="instagram" className="social-icon"/>
                    </a>
                    <a href="https://twitter.com/?lang=en" target="_blank">
                        <img src={twitter} alt="twitter" className="social-icon" />
                    </a> 
                    <a href="https://www.facebook.com/" target="_blank">
                        <img src={facebook} alt="facebook" className="social-icon" />
                    </a>
                </div>
            </div>
            <div id="footer-bottom">
                <img src={amex} alt="amex" className="pay-icon"/>
                <img src={visa} alt="visa" className="pay-icon"/>
                <img src={mastercard} alt="mastercard" className="pay-icon"/>
                <img src={paypal} alt="paypal" className="pay-icon"/>
                <img src={applepay} alt="applepay" className="pay-icon"/>
            </div>
        </div>
    )
}

export default Footer;