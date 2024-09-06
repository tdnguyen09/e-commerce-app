import React, { useEffect, useState } from "react";

const WebContext = React.createContext()

function Provider({ children }){
    const [datas, setDatas] = useState([]);
    const [cartItems, setCartItems] = useState([]);

//fetching data
    useEffect(() => {
        fetch("https://final-project-database.onrender.com/products")
        .then(res => res.json())
        .then(products => {
            setDatas(products)
        })
    }, [])
//functions for carts
    function getItemQuantity(index) {
        const item = cartItems.find(item => item.id === index)
        return item ? item.quantity : 0 ;
    }

    function addToCart(index) {
        let quantity = getItemQuantity(index);
        let productData = datas.find(data => data.id === index)
        if (quantity === 0){
            setCartItems([
                ...cartItems,
                {
                    id: index,
                    price: productData.price,
                    name: productData.name,
                    image: productData.image,
                    quantity: 1
                }
            ])
        } else {
            setCartItems(cartItems.map(item => {
                if (item.id === index) {
                    return { ... item, quantity: item.quantity + 1}
                } else {
                    return item;
                }
            }))
        }
    }

    function removeFromCart (index) {
        const updatedCartItems = cartItems.filter( item => item.id !== index);
        setCartItems(updatedCartItems)
    }

    function removeOneFromCart (index) {
        let quantity = getItemQuantity(index)
        if(quantity === 1) {
            removeFromCart(index)
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
        getItemQuantity, 
        addToCart,
        removeFromCart,
        removeOneFromCart,
        totalQuantity,
        deleteCart, 
        totalCost
    }

    return (
        <WebContext.Provider value = {contextValue}>
            {children}
        </WebContext.Provider>
    )
}

export { WebContext, Provider };
