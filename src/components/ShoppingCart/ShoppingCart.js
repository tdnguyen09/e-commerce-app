import React from "react";

function ShoppingCart () {
    return (
        <div className="shopping-cart">
            <h2>Your Shopping Cart</h2>
            <table>
                <tr>
                    <th>Prodcuts</th>
                    <th>Price</th>
                    <th>Quantity</th>
                </tr>
            </table>
            <p>Total: $</p>
        </div>
    )
}

export default ShoppingCart;