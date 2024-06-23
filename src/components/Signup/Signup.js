import React from "react";
import "./Signup.css"
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function Signup() {
    return (
        <div className="signup-page">   
            <h1>Register</h1>
            <h4>Please fill in the fields below:</h4>
            <form>
                <div className="input-container">
                    <input type="text" id="firstname-input" className="input-field" required />
                    <label for="firstname-input" className="input-label">Firstname</label>
                </div>
                <div className="input-container">
                    <input type="text" id="lastname-input" className="input-field" required />
                    <label for="lastname-input" className="input-label">Lastname</label>
                </div>
                <div className="input-container">
                    <input type="email" id="email-input-register" className="input-field" required />
                    <label for="email-input-register" className="input-label">Email</label>
                </div>
                <div className="input-container">
                    <input type="password" id="password-input-register" className="input-field" required />
                    <label for="password-input-register" className="input-label">Password</label>
                </div>
                <div className="input-container">
                    <input type="password" id="password-input-confirm" className="input-field" required />
                    <label for="password-input-confirm" className="input-label">Confirm Password</label>
                </div>
                <div className="input-container">
                    <input type="text" id="phone-input" className="input-field" required />
                    <label for="phone-input" className="input-label">Phone</label>
                </div>
                <div className="input-container">
                    <input type="text" id="address-input" className="input-field" required />
                    <label for="address-input" className="input-label">Address</label>
                </div>
                <div id="address-additional-input">
                    <input type="text" id="suburb-input" placeholder="Suburb/City" className="address-input-field" required />
                    <select id="state-register" name="state-register" className="address-input-field">
                        <option value="ACT">ACT</option>
                        <option value="NSW">NSW</option>
                        <option value="NT">NT</option>
                        <option valuue="QLD">QLD</option>
                        <option value="SA">SA</option>
                        <option value="TAS">TAS</option>
                        <option value="VIC">VIC</option>
                        <option value="WA">WA</option>
                    </select>
                    <input type="text" id="postcode-input" placeholder="Postcode" className="address-input-field" required />
                </div>
                <button id="btn-register" type="submit">CREATE ACCOUNT</button>
            </form>
            <p>
                Already have an account? 
                <span ><Link to="/login" id="login-link">Login</Link></span>
            </p>
        </div>
    )
}

export default Signup;