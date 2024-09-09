import React, { useContext, useState } from "react";
import { WebContext } from "../WebContext";
import './Checkout.css'
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


function Checkout({ user }) {
    const context = useContext(WebContext)
    const [isOrderSubmit, setIsOrderSubmit] = useState(false);
    const history = useHistory()
    let orderItems = context.cartItems
    let total = context.totalCost()

    function handleClick() {
        const orderDetail = {
            user_id: user.id,
            products: orderItems,
            total:total,
            orderDate: new Date().toISOString()
        }
        fetch("https://final-project-database.onrender.com/checkout",{
        // fetch("http://127.0.0.1:5000/checkout",{
            method: 'POST',
            credentials:'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderDetail),
        })
        .then(res => {
            if(res.ok) {
                return res.json()}
            })
        .then(() => {
            setIsOrderSubmit(true)
            setTimeout(() => {
                setIsOrderSubmit(false);
                context.deleteCart()
                history.push('/')
            }, 5000);
        })  
    }
    return (
        <div id="checkout-page">
            <div id={isOrderSubmit? "checkout-details-blur" : "checkout-details"}>
            {/* <div id="checkout-details-blur" > */}
                <div id="review-cart">
                    <h3 style={{marginBottom:'20px'}}>Review cart</h3>
                    {context.cartItems.map(item => (
                        <div key={item.id} className="item-wrapper">
                            <img src={item.image} alt={item.name} />
                            <p style={{ fontWeight:'550'}}>{item.name}</p>
                            <p>Qty: {item.quantity}</p>
                            <p>${item.price}</p>
                        </div>
                    ))}
                    <p style={{marginTop:'20px', fontWeight:'700'}}>Total: ${context.totalCost()}</p>
                </div>
                <div id="contact-confirm">
                    <h3 style={{marginTop:'10px'}}>Contact Details</h3>
                    <p style={{fontWeight:'600'}}>{user.firstname} {user.lastname}</p>
                    <p style={{fontSize:'17px'}}>Email: {user.email}</p>
                    <p style={{fontSize:'17px'}}>Address: {user.address}, {user.suburb}, {user.state} {user.postcode}</p>
                    <p style={{fontSize:'17px'}}> Phone: {user.phonenumber}</p>
                </div>
                <button 
                    onClick={() => handleClick()}
                    style={{width:'150px', height:'40px', fontSize:'15px', backgroundColor:'blue', color:'white', fontWeight:'700', padding:'5px', cursor:'pointer'}}
                >
                    Submit Order
                </button>
            </div>
            {isOrderSubmit && (
                <div id="modal">
                    <p>Order submitted successfully!</p>
                </div>
            )}
        </div>
    )
}

export default Checkout;