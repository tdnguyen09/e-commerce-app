import React, { useContext } from "react";
import { WebContext } from "../WebContext";


function Checkout({ user }) {
    const context = useContext(WebContext)
    let orderItems = context.cartItems
    let total = context.totalCost()
    console.log(user)
    console.log(context.cartItems)

    function handleClick() {
        const orderDetail = {
            user_id: user.id,
            products: orderItems,
            total:total,
            orderDate: new Date().toISOString()
        }
        fetch("http://127.0.0.1:5000/checkout",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderDetail),
        })
        .then(res => res.json())
        .then(res => console.log(res))
    }
    return (
        <div>
            <div>
                <h3>Review cart</h3>
                {context.cartItems.map(item => (
                    <div key={item.id}>
                        <p>{item.name}</p>
                        <p>{item.quantity}</p>
                        <p>{item.price}</p>
                        <p>Total: ${context.totalCost()}</p>
                    </div>
                ))}
            </div>
            <div>
                <h3>Contact Details</h3>
                <p>{user.firstname} {user.lastname}</p>
                <p>{user.email}</p>
                <p>Address:{user.address}, {user.suburb}, {user.state} {user.postcode}</p>
                <p>Phone: {user.phonenumber}</p>
            </div>
            <button onClick={() => handleClick()}>Submit Order</button>
        </div>
    )
}

export default Checkout;