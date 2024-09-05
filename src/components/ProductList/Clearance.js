import React, { useEffect, useState, useContext } from "react";
import Filter from "../Filter/Filter";
import Pagination from "../Pagination/Pagination";
import usePagination from "../Pagination/usePagination";
import { WebContext } from "../WebContext";
import ProductItem from "../ProductItem/ProductItem";

function Clearance() {
    const context = useContext(WebContext);
    const products = context.allProducts || [];
    const clearanceProducts = products.filter(product => product.is_it_clearance === true);
    const [clearance, setClearance] = useState([]);
    const { currentProducts, totalPages, currentPage, paginate } = usePagination(clearance)
    
    useEffect(() => {
        setClearance(clearanceProducts)
    },[products])

    function handleFilter(filtered){
        setClearance(filtered)
    }

    return (
        <div className="products">
            <h1 style={{background: 'yellow'}}>Clearance</h1>
            <h4 style={{textAlign:'center', marginBottom:'50px'}}>
                The last chance to buy these toys !!! <span style={{color:'red', textDecoration:'underline'}}>DON'T MISS IT</span>
            </h4>
            <div>
                <Filter products={clearanceProducts} onFilter={handleFilter} />
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

export default Clearance;