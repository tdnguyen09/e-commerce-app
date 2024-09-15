import React, { useEffect, useState } from "react";

const WebContext = React.createContext()

function Provider({ children, userLoginID }){
    const [datas, setDatas] = useState([]);
    const [cartItems, setCartItems] = useState([]);

//fetching data
    useEffect(() => {
        // fetch("https://final-project-database.onrender.com/products",{
        //     method:'GET',
        //     credentials:'include',
        // })
        fetch(" http://127.0.0.1:5000/products")
        .then(res => res.json())
        .then(products => {
            setDatas(products)
        })
    }, [])
    useEffect(() => {
        console.log('Cart state updated:', cartItems);
    }, [cartItems]);

//functions for carts
    function getItemQuantity(index) {
        const item = cartItems.find(item => item.id === index)
        return item ? item.quantity : 0 ;
    }

    function addToCart(index) {
        let quantity = getItemQuantity(index);
        let productData = datas.find(data => data.id === index)
        if (quantity === 0){
            setCartItems(prevCartItems => [
                ...prevCartItems,
                {
                    id: index,
                    price: productData.price,
                    name: productData.name,
                    image: productData.image,
                    discount: productData.discount,
                    is_it_new: productData.is_it_new,
                    is_it_onsale: productData.is_it_onsale,
                    is_it_clearance: productData.is_it_clearance,
                    is_it_preorder: productData.is_it_preorder,
                    quantity: 1
                }
            ])
        } else {
            setCartItems(prevCartItems => prevCartItems.map(item => {
                if (item.id === index) {
                    return { ... item, quantity: item.quantity + 1}
                } else {
                    return item;
                }
            }))
        }
    }

    function addItemToCart(index) {
        if (userLoginID) {
            let quantity = getItemQuantity(index)
            let updatedQuantity = quantity + 1
            let productData = datas.find(data => data.id === index)
            console.log(productData);
            console.log(`update:${quantity}`)
            console.log(`updated: ${updatedQuantity}`)

            fetch(`http://127.0.0.1:5000/products/${index}/cart`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userLoginID: userLoginID, quantity: updatedQuantity })
                })
                .then(res => {
                    if(!res.ok){
                        throw new Error('Network response was not ok')
                    }
                    return res.json()
                })
                .then( data => {
                    console.log(data.message)
                    addToCart(index)
                })
                .catch(error => console.error("Error adding to cart:", error));
                
        } else {
            addToCart(index)
            console.log("User not logged in. Just adding to cart locally.");
            console.log(`Added product with index after ${index} to cart.`);
        }
    }

    function removeFromCart (index) {
        const updatedCartItems = cartItems.filter( item => item.id !== index);
        if (userLoginID){
            fetch(`http://127.0.0.1:5000/products/${index}/cart`,{
                method:'DELETE',
                credentials:'include',
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify(userLoginID)
            })
            .then(res => {
                if (!res.ok){
                    throw new Error('Network response was not ok')
                }
                return res.json()
            })
            .then(data => {
                console.log(data.message)
                setCartItems(updatedCartItems)
            })
        }else {
            setCartItems(updatedCartItems)
        }
    }

    function removeOneFromCart (index) {
        let quantity = getItemQuantity(index)
        let updatedQuantity = quantity - 1
        if(quantity === 1) {
            removeFromCart(index)
        } else {
            if (userLoginID){
                fetch(`http://127.0.0.1:5000/products/${index}/cart`,{
                method:'POST',
                credentials:'include',
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({userLoginID: userLoginID, quantity: updatedQuantity})
            })
            .then(res => {
                if (!res.ok){
                    throw new Error('Network response was not ok')
                }
                return res.json()
            })
            .then(data => {
                console.log(data.message)
                setCartItems(cartItems.map(item => {
                    if (item.id === index) {
                        return { ...item, quantity: item.quantity -1}
                    } else {
                        return item;
                    }
                }))
            })
            } else {
                setCartItems(cartItems.map(item => {
                    if (item.id === index) {
                        return { ...item, quantity: item.quantity -1}
                    } else {
                        return item;
                    }
                }))
            }
        }
    }

    function totalQuantity() {
        let totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0)
        return totalQuantity
    }

    function deleteCart() {
        setCartItems([])
    }

    function totalCost () {
        let total = 0;
        cartItems.map(item => {
            total += (item.price * item.quantity)
        })
        return total.toFixed(2)
    }




//context Value

    const contextValue = {
        cartItems: cartItems,
        allProducts: datas,
        setCartItems,
        getItemQuantity, 
        addToCart,
        removeFromCart,
        removeOneFromCart,
        totalQuantity,
        deleteCart, 
        totalCost,
        addItemToCart,
    }

    return (
        <WebContext.Provider value = {contextValue}>
            {children}
        </WebContext.Provider>
    )
}

export { WebContext, Provider };
