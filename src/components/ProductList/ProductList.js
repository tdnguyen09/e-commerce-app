import React, { useContext } from "react";
import { WebContext } from "../WebContext";
import ProductItem from "../ProductItem/ProductItem";
import './ProductList.css'

function ProductList() {
    const context = useContext(WebContext);

    return (
        <div id="products">
            <h1>All Products</h1>
            <div id="filter-bar">

            </div>
            <div className="product-list">
                {context.allProducts.map(product => (
                    <div className="product-container">
                        <ProductItem
                            key={product.id}
                            id={product.id}
                            image={product.image}
                            name={product.name}
                            price={product.price}
                            clearance={product.is_it_clearance}
                            onsale= {product.is_it_onsale}
                            discount={product.discount}
                         />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProductList;