import React, { useContext } from "react";
import { WebContext } from "../WebContext";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import deleteIcon from './delete-icon.svg'
import './ShoppingCart.css'

function ShoppingCart ({ user }) {
    const context = useContext(WebContext)
    let totalCartQuantity = context.totalQuantity()

    return (
        <div id="shopping-cart-page">
            <h2>Your Shopping Cart</h2>
            {totalCartQuantity > 0 ?
            <div id="shopping-cart-items">
                {context.cartItems.map((item) => (
                    <div key={item.id} className="cart-item-container">
                        <img src={item.image} alt={item.name} />
                        <div className="cart-item-wrapper">
                            <p>{item.name}</p>
                            <p>${item.price}</p>
                            <div>
                                <button className="cart-btns" onClick={() => context.removeOneFromCart(item.id)}>-</button>
                                <span>{item.quantity}</span>
                                <button className="cart-btns" onClick={() => context.addToCart(item.id)}>+</button>
                            </div>
                            <button className="shopping-remove-btn" onClick={() => context.removeFromCart(item.id)}><img src={deleteIcon} alt="delete-icon" /></button>
                        </div>
                    </div>
                ))}
            </div>
            : <p style={{ fontSize: '20px', marginTop:'10px'}}>There is no item in the cart</p>
            }
            <p style={{ fontWeight:'700', fontSize: '25px', marginTop:'20px'}}>Total: ${context.totalCost()}</p>
            {user? <Link to="/checkout">
                    <button style={{ 
                        width:'150px', 
                        height:'30px', 
                        fontSize:'20px', 
                        borderRadius:'5px', 
                        backgroundColor:'blue', 
                        color:'white',
                        cursor:'pointer'}}
                    >Check out
                    </button></Link> : null}
        </div>
    )
}

export default ShoppingCart;