import React, { useContext, useEffect, useState } from "react";
import { WebContext } from "../WebContext";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import './ProductDetails.css'

function ProductDetails ({ user, setWishlistItems }) {
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
        if (user){
            const user_id = user.id
            fetch(`http://127.0.0.1:5000/products/${id}`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body: JSON.stringify(user_id)
            })
            .then(res => {
                if(res.status === 201) {
                    return res.json()
                }
            })
            .then(() => {
                setWishlistItems((prevItems) =>[
                    ...prevItems,
                    displayProduct]
                )
            })
        } else {
            alert('Please log in to able add to wishlist')
        }
    }
    console.log(displayProduct)
    
    return (
        <div id="product-details">
            <div id='main-details'>
                <div id="product-image-detail">
                    <img src={displayProduct.image} alt="product-image" />
                </div>
                <aside>
                    <h2 className="product-details-name">{displayProduct.name}</h2>
                    <p>$ {displayProduct.price}</p>
                    {displayProduct.is_it_onsale || displayProduct.is_it_clearance ? <p id="discount-price">Save $ {displayProduct.discount}</p> : null}
                    {productQuantity > 0 ?
                        <div id="btns">
                            <button className="cart-btn-quantity" onClick={() => context.addToCart(displayProduct.id)}>+</button>
                            <span>{productQuantity}</span>
                            <button className="cart-btn-quantity" onClick={() => context.removeOneFromCart(displayProduct.id)}>-</button>
                            <button className="cart-btn" onClick={() => context.removeFromCart(displayProduct.id)}>Remove From Cart</button> 
                        </div>
                        : <button className="cart-btn" onClick={() => context.addToCart(displayProduct.id)}>Add to Cart</button>
                    }
                    <button onClick={() => addToWishlist(displayProduct.id)}>Add To Wishlist</button>
                </aside>
            </div>
            <div id="additional-details-product">
                <p>{displayProduct.description}</p>
                <table>
                    <tr>
                        <td><strong>Brand</strong></td>
                        <td>{displayProduct.brand}</td>
                    </tr>
                    <tr>
                        <td><strong>Product Depth:</strong> </td>
                        <td>{displayProduct.product_depth} cm</td>
                    </tr>
                    <tr>
                        <td><strong>Product Weight</strong></td>
                        <td>{displayProduct.product_weight} kg</td>
                    </tr>
                    <tr>
                        <td><strong>Product Height</strong></td>
                        <td>{displayProduct.product_height} cm</td>
                    </tr>
                    <tr>
                        <td><strong>Product Width</strong></td>
                        <td>{displayProduct.product_width} cm</td>
                    </tr>
                </table>
            </div>      
        </div>
    )
}

export default ProductDetails;