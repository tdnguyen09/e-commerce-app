import React, { useContext, useState, useEffect } from "react";
import { WebContext } from "../WebContext";
import usePagination from "../Pagination/usePagination";
import Pagination from "../Pagination/Pagination";
import ProductItem from "../ProductItem/ProductItem";
import Filter from "../Filter/Filter";
import './Categories.css'

function Category () {
    const context = useContext(WebContext);
    const products = context.allProducts || [];
    const [activePage, setActivePage] = useState(false)
    const [activeTab, setActiveTab] = useState('')
    const [selectedProducts, setSelectedProducts] = useState([])
    const { currentProducts, totalPages, currentPage, paginate } = usePagination(selectedProducts)
    const categories = ['action figures', 'board games', 'build set', 'dolls', 'roleplay', 'preschool', 'soft toy', 'outdoor', 'vehicles', 'others']

    useEffect(() => {
        setSelectedProducts(products)
    },[products])

    function handleTabClick(tab){
        let filteredProducts = products.filter(product => product.category === tab)
        setActiveTab(tab)
        setSelectedProducts(filteredProducts)
        setActivePage(true)
    }

    function handleFilter(filtered){
        setSelectedProducts(filtered)
    }

    console.log(activeTab)
    console.log(selectedProducts)
    console.log(activePage)
    return (
        <div className="products">
            <h1>Shoy by Categories</h1>
            <div>
                <Filter products={selectedProducts} onFilter={handleFilter} />
            </div>
            <div className="tab-nav">
            {categories.map(tab => (
                    <button
                        key={tab}
                        className={activeTab === tab ? 'active' : ''}
                        onClick={() => handleTabClick(tab)}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>
            {activePage ? 
            <div>
                <div className="tab-content">
                {currentProducts.length > 0 ? (
                        currentProducts.map(product => (
                            <div key={product.id} className="product-container">
                                <ProductItem
                                    id={product.id}
                                    image={product.image}
                                    name={product.name}
                                    price={product.price}
                                    clearance={product.is_it_clearance}
                                    onsale={product.is_it_onsale}
                                    discount={product.discount}
                                />
                            </div>
                        ))
                    ) : (
                        <p>No products available for this category.</p>
                    )}
                </div>
            <Pagination 
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={paginate} 
            />
            </div>
            : null
            }
        </div>
    )
}

export default Category;