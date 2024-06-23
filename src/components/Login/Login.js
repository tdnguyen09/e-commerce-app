import React from "react";
import './Login.css'
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function Login () {
    return (
        <div className="login-page">
            <h2>LOGIN</h2>
            <p>Please login to your account to enjoy member-only benefits.</p>
            <form id="login-form">
                <label for="username"><strong>Username</strong></label>
                <input className="fill-input" type="text" id="username" name="username" required /> 
                <a href="">Forgot username</a>
                <label for='password'><strong>Password</strong></label>
                <input className="fill-input" type="password" id="password" name="password" required />
                <div id="show-password-container">
                    <input type="checkbox" name="show-password" id="show-password" />
                    <label for="show-password">Show password</label>
                </div>
                <a href="">Forgot password</a>
                <button type="submit">Login</button>                  
            </form>
            <p className="join-suggestion">
                Don't have an account?
                <span><Link to="/signup">Join today</Link></span>
            </p>
        </div>
    )
}

export default Login