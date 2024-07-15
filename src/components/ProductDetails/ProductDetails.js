import React, { useContext, useEffect, useState } from "react";
import { WebContext } from "../WebContext";
import { useParams } from "react-router-dom/cjs/react-router-dom";

function ProductDetails () {
    const [displayProduct, setDisplayProduct] = useState('');
    const { id } = useParams()
    const context = useContext(WebContext)
    const productQuantity = context.getItemQuantity(displayProduct.id)

    useEffect(() => {
        fetch(`https://json-server-31ga.onrender.com/toys/${id}`)
        .then(res => res.json())
        .then(data => setDisplayProduct(data))
    },[id])

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
            </aside>
        </div>
    )
}

export default ProductDetails;