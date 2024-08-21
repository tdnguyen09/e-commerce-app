import React, { useContext } from "react";
import { WebContext } from "../WebContext";
import { Link } from "react-router-dom/cjs/react-router-dom.min";


function ShoppingCart () {
    const context = useContext(WebContext)
    let totalCartQuantity = context.totalQuantity()

    // function totalCost () {
    //     let total = 0;
    //     context.cartItems.map(item => {
    //         total += (item.price * item.quantity)
    //     })
    //     return total.toFixed(2)
    // }

    return (
        <div className="shopping-cart">
            <h2>Your Shopping Cart</h2>
            {totalCartQuantity > 0 ?
            <table>
                <tr>
                    <th>Prodcuts</th>
                    <th>Price</th>
                    <th>Quantity</th>
                </tr>
                {context.cartItems.map((item) => (
                    <tr key={item.id}>
                        <td>
                            {item.name}
                            <button onClick={() => context.addToCart(item.id)}>+</button>
                            <button onClick={() => context.removeOneFromCart(item.id)}>-</button>
                        </td>
                        <td>${item.price}</td>
                        <td>{item.quantity}</td>
                    </tr>
                ))}
            </table>
            : <p>There is no item in the cart</p>
            }
            <p>Total: ${context.totalCost()}</p>
            <Link to="/checkout"><button>Check out</button></Link>
        </div>
    )
}

export default ShoppingCart;