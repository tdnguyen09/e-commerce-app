import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";

function ProductItem({ image, name, price, clearance, id, onsale, discount }){
    return (
            <Link to={`/products/${id}`}  style={{ textDecoration: 'none' }}>
                <img src={image} alt="product-name" />
                <div>
                    <h4 style={{ color: 'black' }}>{name}</h4>
                    <p style={{ color: 'black' }}>$ {price}
                    {(onsale || clearance) && 
                    <span
                    style={{ color: 'black', background:'yellow', border:'solid 1px black', borderRadius:'5px', fontSize:'0.75em', width:'fit-content', padding:'3px' }}>
                        Save $ {discount}
                    </span>}
                    </p>
                </div>
            </Link>
    )

}
export default ProductItem;