import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";

function ProductItem({ image, name, price, clearance, id }){
    return (
            <Link to={`/products/${id}`}>
                <img src={image} alt="product-name" />
                <div>
                    <h4>{name}</h4>
                    <p>$ {price}</p>
                    <p>{clearance}</p>
                </div>
            </Link>
    )

}
export default ProductItem;