import React, { useEffect, useState } from "react";

const WebContext = React.createContext()

function Provider({ children }){
    const [datas, setDatas] = useState([]);
    const [isLogin, setIsLogin] = useState(false);
    const [username, setUsername] = useState('')
    const [cartItems, setCartItems] = useState([]);

//fetching data
    useEffect(() => {
        fetch("http://127.0.0.1:5000/products")
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

// functions for login and logout

    function login(username){
        setIsLogin(true);
        setUsername(username);
    }

    function logout() {
        setIsLogin(false);
        setUsername('')
    }

//context Value

    const contextValue = {
        cartItems: cartItems,
        allProducts: datas,
        isLogin: isLogin,
        username: username,
        getItemQuantity, 
        addToCart,
        removeFromCart,
        removeOneFromCart,
        totalQuantity,
        deleteCart,
        login,
        logout, 
        totalCost
    }

    return (
        <WebContext.Provider value = {contextValue}>
            {children}
        </WebContext.Provider>
    )
}

export { WebContext, Provider };
