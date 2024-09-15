import React, { useContext, useEffect, useState } from "react";
import { WebContext } from "../WebContext";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import './ProductDetails.css'

function ProductDetails ({ user, wishlistItems, setWishlistItems }) {
    const [displayProduct, setDisplayProduct] = useState('');
    const [isItemInWishlist, setIsItemInWishlist] = useState(false);
    const { id } = useParams()
    const context = useContext(WebContext)
    const productQuantity = context.getItemQuantity(displayProduct.id)

    console.log(context.cartItems)

    useEffect(() => {
        // fetch(`https://final-project-database.onrender.com/products/${id}`,{
        //     method:'GET',
        //     credentials:'include',
        // })
        fetch(`http://127.0.0.1:5000/products/${id}`)
        .then(res => res.json())
        .then(data => {
            setDisplayProduct(data)
            const inWishlist = wishlistItems.some(product => 
                product.id === data.id && product.name === data.name)
            if(inWishlist){
                setIsItemInWishlist(true)
            }
        })
    },[id])

    function addToWishlist(id) {
        if (user){
            const user_id = user.id
            // fetch(`https://final-project-database.onrender.com/products/${id}`,{
            fetch(`http://127.0.0.1:5000/products/${id}`,{
                method:'POST',
                credentials:'include',
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
                setIsItemInWishlist(true)
                setWishlistItems((prevItems) =>[
                    ...prevItems,
                    displayProduct]
                )
            })
        } else {
            alert('Please log in to able add to wishlist')
        }
    }
    function removeFromWishlist(id){
        const user_id = user.id
        // fetch(`https://final-project-database.onrender.com/products/${id}`,{
        fetch(`http://127.0.0.1:5000/products/${id}`,{
            method:'DELETE',
            credentials:'include',
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify(user_id)
        })
        .then(res => res.json())
        .then(() => {
            const updateWishlist = wishlistItems.filter(item => item.id !== id)
            setWishlistItems(updateWishlist)
            setIsItemInWishlist(false)
        })

    }

    // function addItemToCart(id){
    //     context.addToCart(id)
    //     if (user){
    //         const user_id = user.id;
    //         setTimeout(() => {
    //             const quantity = context.getItemQuantity(id);
    //             console.log('Quantity retrieved:', quantity);
    //         fetch(`http://127.0.0.1:5000/products/${id}/cart`,{
    //             method:'POST',
    //             credentials:'include',
    //             headers:{
    //                 'Content-Type':'application/json',
    //             },
    //             body: JSON.stringify({user_id, quantity})
    //         })
    //         .then(res => res.json())
    //         .then(data => console.log(data.message))},200)
    // }}
    // function quantityChange(id){
    //     const user_id = user.id;
    //     const quantity = productQuantity;
    //     fetch(`http://127.0.0.1:5000/products/${id}/cart`,{
    //         method:'PATCH',
    //         credentials:'include',
    //         headers:{
    //             'Content-Type':'application/json',
    //         },
    //         body: JSON.stringify({user_id, quantity})
    //     })
    //     .then(res => res.json())
    //     .then(() => {
    //         context.removeOneFromCart(id)
    //     })
    // }
    // function deleteItemFromCart(id){
    //     const user_id = user.id;
    //     fetch(`http://127.0.0.1:5000/products/${id}/cart`,{
    //         method:'DELETE',
    //         credentials:'include',
    //         headers:{
    //             'Content-Type':'application/json',
    //         },
    //         body:JSON.stringify(user_id=user.id)
    //     })
    //     .then(res => res.json())
    //     .then(() => {
    //         context.removeFromCart(id)
    //     })
    // }
    
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
                            <button className="cart-btn-quantity" onClick={() => context.addItemToCart(displayProduct.id)}>+</button>
                            <span>{productQuantity}</span>
                            <button className="cart-btn-quantity" onClick={() => context.removeOneFromCart(displayProduct.id)}>-</button>
                            <button className="cart-btn" onClick={() => context.removeFromCart(displayProduct.id)}>Remove From Cart</button> 
                        </div>
                        : <button className="cart-btn" onClick={() => context.addItemToCart(displayProduct.id)}>Add to Cart</button>
                    }
                    {isItemInWishlist ?
                        <button onClick={() => removeFromWishlist(displayProduct.id)}>❤️</button>
                        :<button onClick={() => addToWishlist(displayProduct.id)}>🤍</button>
                    }
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