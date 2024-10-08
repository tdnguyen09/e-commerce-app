import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./Logout.css"
import { WebContext } from "../WebContext";


function Logout ({ setUser, user }) {
    const history = useHistory()
    const context = useContext(WebContext);



    function handleChange(e){
        let name = e.target.name
        let value = e.target.value
        setUser({
            ...user,
            [name]:value
        })
    }

    function handleUpdate(){
        fetch('https://final-project-database.onrender.com/update-detail',{
        // fetch('http://127.0.0.1:5000/update-detail',{
            method:'PATCH',
            credentials:'include',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify(user)
        })
        .then(res => {
            if(res.ok) {
                return res.json()
            }else{
                return res.json().then(errorMessage => {
                    throw new Error(errorMessage.error)
                })
            }
        })
        .then(() => alert('Update successfully'))
        .catch(error => {
            alert(error.message);  
        });
    }

    function handleLogout() {
        fetch('https://final-project-database.onrender.com/logout', {
        // fetch('http://127.0.0.1:5000/logout', {
            method: 'DELETE',
            credentials:'include',
        }).then (res =>{
            if(res.status === 204){
                setUser(null)
                history.push('/login')
                context.setCartItems([])
            } else {
                console.error('failed to log out')
            }
        })
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error))
    }
    return (
        <div id="update-page">
            <h2>Hello, {user.firstname} {user.lastname} </h2>
            <div id="update-details">   
                <div className="update-user-container">
                    <label for='update-firstname'>Fristname</label>
                    <input type="text" id="update-firstname" name="firstname" className="update-user-field" defaultValue={user.firstname} onChange={handleChange} value={user.firstname} />
                </div>
                <div className="update-user-container">
                    <label for='update-lastname'>Lastname</label>
                    <input type="text" id="update-lastname" name="lastname" className="update-user-field" defaultValue={user.lastname} onChange={handleChange} value={user.lastname} />
                </div>
                <div className="update-user-container">
                    <label for='update-email'>Email</label>
                    <input type="text" id="update-email" name="email" className="update-user-field" defaultValue={user.email} onChange={handleChange} value={user.email} />
                </div>
                <div className="update-user-container">
                    <label for='update-phone'>Phone</label>
                    <input type="text" id="update-phone" name="phone" className="update-user-field" defaultValue={user.phonenumber} onChange={handleChange} value={user.phone} />
                </div>
                <div className="update-user-container">
                    <label for='update-address'>Address</label>
                    <input type="text" id="update-address" name="address" className="update-user-field" defaultValue={user.address} onChange={handleChange} value={user.address} />
                </div>
                <div className="update-user-container" id="update-user-additional-address">
                    <label for='update-suburd'>Suburb/City</label>
                    <div id="other-info-wrapper">
                        <input type="text" id="update-suburb" name="suburb" defaultValue={user.suburb} onChange={handleChange} value={user.suburb} />
                        <select id="update-state" name="state" defaultValue={user.state} onChange={handleChange} value={user.state}>
                            <option value='ACT'>ACT</option>
                            <option value='NSW'>NSW</option>
                            <option value='NT'>NT</option>
                            <option value='QLD'>QLD</option>
                            <option value='SA'>SA</option>
                            <option value='TAS'>TAS</option>
                            <option value='VIC'>VIC</option>
                            <option value='WA'>WA</option>
                        </select>
                        <input type="text" id="update-postcode" name="postcode" defaultValue={user.postcode} onChange={handleChange} value={user.postcode} placeholder="postcode" />
                    </div>
                </div>
            </div>
            <div id="button-container-logout">
                <button><Link to='/order-history' style={{textDecoration:'none', color:'white'}}>Order History</Link></button>
                <button onClick={() => handleUpdate()}>Update</button>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
    )
}

export default Logout;