import React, { useState } from "react";

const CartContext = React.createContext()

function CartProvider({ children }){
    const [isLogin, setIsLogin] = useState(false)


    function login(username){
        setIsLogin(true)
    }

    const contextValue = {
        login
    }

    return (
        <CartContext.Provider value = {contextValue}>
            {children}
        </CartContext.Provider>
    )
}

export { CartContext, CartProvider };
