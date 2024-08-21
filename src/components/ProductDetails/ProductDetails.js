import React, { useContext, useEffect, useState } from "react";
import { WebContext } from "../WebContext";
import { useParams } from "react-router-dom/cjs/react-router-dom";

function ProductDetails ({ user, wishlistItems, setWishlistItems }) {
    const [displayProduct, setDisplayProduct] = useState('');
    const { id } = useParams()
    const context = useContext(WebContext)
    const productQuantity = context.getItemQuantity(displayProduct.id)

    useEffect(() => {
        fetch(`http://127.0.0.1:5000/products/${id}`)
        .then(res => res.json())
        .then(data => setDisplayProduct(data))
    },[id])

    function addToWishlist(id) {
        const user_id = user.id
        fetch(`http://127.0.0.1:5000/products/${id}`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify(user_id)
        })
        .then(res => res.json())
        .then(() => {
            setWishlistItems((prevItems) =>[
                ...prevItems,
                displayProduct]
            )
        })
    }
    console.log(displayProduct)
    
    return (
        <div id="product-details">
            <div className="product-image">
                <img src={displayProduct.image} alt="product-image" />
            </div>
            <aside>
                <h2 className="product-details-name">{displayProduct.name}</h2>
                <p>$ {displayProduct.price}</p>
                {productQuantity > 0 ?
                    <>
                        <p>Quanntity: {productQuantity}</p>
                        <button className="cart-btn" onClick={() => context.addToCart(displayProduct.id)}>+</button>
                        <button className="cart-btn" onClick={() => context.removeOneFromCart(displayProduct.id)}>-</button>
                        <button className="cart-btn" onClick={() => context.removeFromCar(displayProduct.id)}>Remove From Cart</button> 
                    </>
                    : <button className="cart-btn" onClick={() => context.addToCart(displayProduct.id)}>Add to Cart</button>
                }
                <button onClick={() => addToWishlist(displayProduct.id)}>Add To Wishlist</button>
            </aside>
        </div>
    )
}

export default ProductDetails;