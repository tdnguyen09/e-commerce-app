import React, { useState } from "react";
import "./Admin.css"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


function Admin({ setAdmin }){
    const history = useHistory()
    const [formAdmin, setFormAdmin] = useState({
        usernameAdmin:'',
        passwordAdmin:''
    })
    const [signupAdmin, setSignupAdmin] = useState({
        usernameSignup:'',
        passwordSignup:''
    })

    function handleChange(event){
        let name = event.target.name
        let value = event.target.value

        setSignupAdmin({
            ...signupAdmin,
            [name]:value,
        })

        setFormAdmin ({
            ...formAdmin,
            [name]: value,
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        const userAdmin = {
            username: formAdmin.usernameAdmin,
            password: formAdmin.passwordAdmin
        }
        fetch('https://final-project-database.onrender.com/admin/login', {
        // fetch('http://127.0.0.1:5000/admin/login', {
            method:'POST',
            credentials:'include',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(userAdmin)
        })
        .then (res => res.json())
        .then (data => {
            console.log(data)
            setAdmin(data)
            history.push('/admin-dashboard')
        })
    }
    function handleSignup(e){
        e.preventDefault();
        const userSignup = {
            username: signupAdmin.usernameSignup,
            password: signupAdmin.passwordSignup
        }
        // fetch('http://127.0.0.1:5000/admin', {
        fetch('https://final-project-database.onrender.com/admin', {
            method:'POST',
            credentials:'include',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(userSignup)
        })
        .then(res => res.json())
        .then(data => {
            setAdmin(data)
            history.push('/admin-dashboard')
        })
    }
    return (
        <div id="admin-page">
            <h4>Admin login</h4>
            <form type='submit'onSubmit={handleSubmit}>
                <label htmlFor='username-admin'><strong>Username</strong></label>
                <input type='text' id="username-admin" name="usernameAdmin" value={formAdmin.usernameAdmin} onChange={handleChange} />
                <label htmlFor='username-password'><strong>Password</strong></label>
                <input type="password" id="username-password" name="passwordAdmin" value={formAdmin.passwordAdmin} onChange={handleChange} />
                <button>Login</button>            
            </form>
            <h4>Signup admin</h4>
            <form type='submit' onSubmit={handleSignup}>
                <label htmlFor="username-sigup"><strong>Username</strong></label>
                <input type="text" id="username-signup" name="usernameSignup" value={signupAdmin.usernameSignup} onChange={handleChange} />
                <label htmlFor="password-sigup"><strong>Password</strong></label>
                <input type="password" id="password-signup" name="passwordSignup" value={signupAdmin.passwordSignup} onChange={handleChange} />
                <button>Sigup</button>
            </form>
        </div>
    )
}

export default Admin;