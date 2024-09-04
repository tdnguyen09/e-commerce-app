import React, { useState } from "react";
import './Login.css'
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";



function Login ({ setUser, setWishlistItems }) {
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [loginError, setLoginError] = useState('')
    const history = useHistory()
    const [formLogin, setFromLogin] = useState({
        email:"",
        password:""
    });

    function handleChange (e) {
        let name = e.target.name;
        let value = e.target.value;

        setFromLogin({
            ...formLogin,
            [name]: value,
        })
    }
    function handleSubmit (e) {
        e.preventDefault()
        const loginData = {
            email: formLogin.email,
            password: formLogin.password
        }

        fetch("http://127.0.0.1:5000/login", {
            method:"POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(loginData),
        })
        .then(res => {
            if (!res.ok) {
                return res.json().then(data => {
                    setLoginError(data.error)
                    throw new Error(data.error)
                })
            }
            return res.json()
        })
        .then(loginData => {
            setLoginError('')
            setUser(loginData)
            setWishlistItems(loginData.products)
            history.push('/logout')})
        .catch(error => {
            console.error("Error during login:", error);
        });
        
        setFromLogin({
            email:"",
            password:""
        })
    }

    function showPassword () {
        setPasswordVisible((prevPasswordVisible) => !prevPasswordVisible)
    }

    return (
        <div className="login-page">
            <h2>LOGIN</h2>
            <p>Please login to your account to enjoy member-only benefits.</p>
            <form id="login-form" onSubmit={handleSubmit}>
                <label for="username"><strong>Username</strong></label>
                <input className="fill-input" type="text" id="login-email" name="email" onChange={handleChange} value={formLogin.email} required /> 
                <a href="">Forgot username</a>
                <label for='password'><strong>Password</strong></label>
                <input className="fill-input" type={passwordVisible ? "text" : "password"} id="password" name="password" onChange={handleChange} value={formLogin.password} required />
                <div id="show-password-container">
                    <input type="checkbox" name="show-password" id="show-password" onChange={showPassword} checked={passwordVisible}/>
                    <label for="show-password">Show password</label>
                </div>
                <a href="">Forgot password</a>
                {loginError && <p style={{color:'red', marginTop:'10px', fontSize:'15px'}}>{loginError}</p>}
                <button type="submit">Login</button>                  
            </form>
            <p className="join-suggestion">
                Don't have an account?
                <span><Link to="/signup">Join today</Link></span>
            </p>
        </div>
    )
}

export default Login;