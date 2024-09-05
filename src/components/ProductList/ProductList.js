import React, { useContext, useEffect, useState } from "react";
import { WebContext } from "../WebContext";
import ProductItem from "../ProductItem/ProductItem";
import './ProductList.css'
import Filter from "../Filter/Filter";
import usePagination from "../Pagination/usePagination";
import Pagination from "../Pagination/Pagination";

function ProductList() {
    const context = useContext(WebContext);
    const products = context.allProducts || [];
    const [sortedProducts, setSortProducts] = useState([])
    const { currentProducts, totalPages, currentPage, paginate } = usePagination(sortedProducts)

    useEffect(() => {
        setSortProducts(products)
    },[products])

    function handleFilter(filtered) {
        setSortProducts(filtered)
    }

    return (
        <div className="products">
            <h1>All Products</h1>
            <div>
                <Filter products={products} onFilter={handleFilter}/>
            </div>
            {/* <div>
                <label htmlFor="categories">Categories</label>
                <select>
                    <option>Select category</option>
                    <option value='action figures'>Action Figures</option>
                    <option value='board games'>Board Games</option>
                    <option value='build set'>Build Set</option>
                    <option value='dolls'>Dolls</option>
                    <option value='roleplay'>Roleplay</option>
                    <option value='preschool'>Pre-school</option>
                    <option value='soft toy'>Soft Toy</option>
                    <option value='outdoor'>Ourdoor</option>
                    <option value='vehicles'>Vehicles</option>
                    <option value='others'>Others</option>
                </select>
            </div> */}
            <div className="product-list">
                {currentProducts.map(product => (
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
            <Pagination 
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={paginate} 
            />
        </div>
    )
}

export default ProductList;