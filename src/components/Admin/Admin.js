import React, { useState } from "react";


function Admin(){
    const [formAdmin, setFormAdmin] = useState({
        usernameAdmin:'',
        passwordAdmin:''
    })

    function handleChange(event){
        let name = event.target.name
        let value = event.target.value

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
        fetch('http://127.0.0.1:5000/admins', {
            method:'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(userAdmin)
        })
        .then (res => res.json())
        .then (data => console.log(data))
    }
    return (
        <div className="admin-page">
            <form type='submit'onSubmit={handleSubmit}>
                <label for='username-admin'>username</label>
                <input type='text' id="username-admin" name="usernameAdmin" value={formAdmin.usernameAdmin} onChange={handleChange} />
                <label for='username-password'>password</label>
                <input type="password" id="username-password" name="passwordAdmin" value={formAdmin.passwordAdmin} onChange={handleChange} />
                <button>login</button>            
            </form>
        </div>
    )
}

export default Admin;