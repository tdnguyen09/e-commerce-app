import React, { useContext } from "react";
import { WebContext } from "../WebContext";
import ProductItem from "../ProductItem/ProductItem";

function ProductList() {
    const context = useContext(WebContext);

    return (
        <div id="products">
            <h1>All</h1>
            <div id="filter-bar">

            </div>
            <div className="product-list">
                <h2>Albums</h2>
                {context.allProducts.map(product => (
                    <div className="product-container">
                        <ProductItem
                            id={product.id}
                            key={product.id}
                            image={product.image}
                            name={product.name}
                            price={product.price}
                            clearance={ product.clearance ? <p>Save {product.discount}</p> : null } />
                    </div>
                ))}
            </div>
            <div className="product-list">
                <h2></h2>
            </div>
            <div className="product-list">
                <h2>MD/Goods</h2>
            </div>
        </div>
    )
}

export default ProductList;