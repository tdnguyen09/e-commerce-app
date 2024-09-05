import React, { useContext, useEffect, useState } from "react";
import Filter from "../Filter/Filter";
import { WebContext } from "../WebContext";
import usePagination from "../Pagination/usePagination";
import ProductItem from "../ProductItem/ProductItem";
import Pagination from "../Pagination/Pagination";
import './ProductList.css'


function Preorder() {
    const context = useContext(WebContext);
    const products = context.allProducts || [];
    const preOrderProducts = products.filter(product => product.is_it_preorder === true);
    const [sortedPreorder, setSortedPreorder] = useState([]);
    const { currentProducts, totalPages, currentPage, paginate } = usePagination(sortedPreorder);
    
    useEffect(() => {
        setSortedPreorder(preOrderProducts)
    },[products])

    

    function handleFilter(filtered) {
        setSortedPreorder(filtered)
    }

    return (
        <div className="products">
            <h1>Pre-Order Products</h1>
            <div>
                <Filter products={preOrderProducts} onFilter={handleFilter} />
            </div>
            <div className="product-list">
                {currentProducts.map(product => (
                    <div className="product-container" key={product.id}>
                        <ProductItem
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

export default Preorder;