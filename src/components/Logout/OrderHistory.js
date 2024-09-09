import React, { useEffect, useState } from "react";
import './OrderHistory.css'

function OrderHistory({ user }) {
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        fetch('https://final-project-database.onrender.com/orders',{
            method:'GET',
            credentials:'include',
        })
        // fetch('http://127.0.0.1:5000/orders')
        .then(res => res.json())
        .then(data => {
            setOrders(data)
        })
    },[])
    const ordersHistory = orders.filter(order => order.user_id === user.id)
    
    return (
        <div id='order-history'>
            <h3>Order History</h3>
            {ordersHistory.map(order => (
                <div className="order-container">
                    <p><strong>Order Number:</strong> {order.id}</p>
                    <p><strong>Order Date:</strong> {new Date(order.order_date).toLocaleString()}</p>
                    <h4>Items:</h4>
                    {order.products.map(product => (
                        <div key={product.id} className="order-wrapper">
                            <p style={{width:'60%'}}>{product.name}</p>
                            <p>Qty: {product.quantity}</p>
                            <p>${product.price}</p>
                        </div>
                    ))}
                    <p><strong>Subtotal: ${order.total}</strong></p>
                </div>
            ))}
        </div>
    )
}

export default OrderHistory;