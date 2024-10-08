import React from "react";
import ProductItem from "../ProductItem/ProductItem";
import './Wishlist.css'


function Wishlist ({ user, wishlistItems, setWishlistItems }) {
    
    function remove(id){
        const user_id = user.id
        fetch(`https://final-project-database.onrender.com/products/${id}`,{
        // fetch(`http://127.0.0.1:5000/products/${id}`,{
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
        })

    }
    console.log(wishlistItems)
    return (
        <div id="wishlist-page">
            <h2>My Wishlist</h2>
            {user ?
            <section id="wishlist-products">
                {wishlistItems.map(product => (
                    <div className="product-wishlist-container">
                        <ProductItem
                            key={product.id}
                            id={product.id}
                            image={product.image}
                            name={product.name}
                            price={product.price}
                            onsale={product.is_it_onsale}
                            clearance={product.is_it_clearance}
                            discount={product.discount}/>
                        <button onClick={() => remove(product.id)}>Remove From Wishlist</button>
                    </div>
                ))}
            </section>
            : <p style={{textAlign:'center', marginTop:'20px', marginBottom:'20px'}}>You need to login to see the wishlist</p>
            }
        </div>
    )
}

export default Wishlist;