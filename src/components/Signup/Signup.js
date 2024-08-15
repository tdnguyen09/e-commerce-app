import React, { useState } from "react";
import "./Signup.css"
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function Signup() {
    const [formData, setFormData] = useState({
        firstname: "",
        lastname:"",
        email:"",
        password:"",
        phone:"",
        address:"",
        suburb:"",
        state:"",
        postcode:""
    })
    function handleChange(event) {
        let name = event.target.name
        let value = event.target.value

        setFormData ({
            ...formData,
            [name]: value,
        })
    }

    function handleSubmit (e) {
        e.preventDefault();
        const userData = {
            firstname: formData.firstname,
            lastname: formData.lastname,
            email: formData.email,
            password: formData.password,
            address: formData.address,
            state: formData.state,
            postcode: formData.postcode,
            suburb: formData.suburb,
            phone: formData.phone
        };
        fetch("http://127.0.0.1:5000/signup", {
            method:"POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        })
            .then( res => res.json())
            .then(userData => console.log(userData))
        //set inputs back to empty
        setFormData({
            firstname: "",
            lastname:"",
            email:"",
            password:"",
            phone:"",
            address:"",
            suburb:"",
            state:"",
            postcode:""
        })
    }
    return (
        <div className="signup-page">   
            <h1>Register</h1>
            <h4>Please fill in the fields below:</h4>
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <input type="text" id="firstname-input" className="input-field" name="firstname" onChange={handleChange} value={formData.firstname} required />
                    <label for="firstname-input" className="input-label">Firstname</label>
                </div>
                <div className="input-container">
                    <input type="text" id="lastname-input" className="input-field" name='lastname' onChange={handleChange} value={formData.lastname} required />
                    <label for="lastname-input" className="input-label">Lastname</label>
                </div>
                <div className="input-container">
                    <input type="email" id="email-input-register" className="input-field" name="email" onChange={handleChange} value={formData.email} required />
                    <label for="email-input-register" className="input-label">Email</label>
                </div>
                <div className="input-container">
                    <input type="password" id="password-input-register" className="input-field" name="password" onChange={handleChange} value={formData.password} required />
                    <label for="password-input-register" className="input-label">Password</label>
                </div>
                <div className="input-container"> 
                    <input type="password" id="password-input-confirm" className="input-field" name="password-confirm" required />
                    <label for="password-input-confirm" className="input-label">Confirm Password</label>
                </div>
                <div className="input-container">
                    <input type="text" id="phone-input" className="input-field" name="phone" onChange={handleChange} value={formData.phone} required />
                    <label for="phone-input" className="input-label">Phone</label>
                </div>
                <div className="input-container">
                    <input type="text" id="address-input" className="input-field" name="address" onChange={handleChange} value={formData.address} required />
                    <label for="address-input" className="input-label">Address</label>
                </div>
                <div id="address-additional-input">
                    <input type="text" id="suburb-input" placeholder="Suburb/City" name="suburb" className="address-input-field" onChange={handleChange} value={formData.suburb} required />
                    <select id="state-register" name="state" className="address-input-field" onChange={handleChange} value={formData.state}>
                        <option value="ACT">ACT</option>
                        <option value="NSW">NSW</option>
                        <option value="NT">NT</option>
                        <option valuue="QLD">QLD</option>
                        <option value="SA">SA</option>
                        <option value="TAS">TAS</option>
                        <option value="VIC">VIC</option>
                        <option value="WA">WA</option>
                    </select>
                    <input type="text" id="postcode-input" placeholder="Postcode" className="address-input-field" name="postcode" onChange={handleChange} value={formData.postcode} required />
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