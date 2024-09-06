import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import './Home.css'
import { WebContext } from "../WebContext";
import ProductItem from "../ProductItem/ProductItem";

function Home () {
    const context = useContext(WebContext);
    const products = context.allProducts||[];
    const newProducts = products.filter(product => product.is_it_new === true);
    const saleProducts = products.filter(product => product.is_it_onsale === true);
    const [newItems, setNewItems] = useState([])
    const [saleItems, setSaleItems] = useState([])

    useEffect(() => {
        setNewItems(newProducts)
        setSaleItems(saleProducts)
    },[products])

    return (
        <div id="home-page">
            <div className="background-container">
                <Link style={{textDecoration:'none', fontFamily:'cursive'}} to='/products'><p>Shop Now</p></Link>
            </div>
            <h4 style={{textAlign:'center', marginBottom:'20px', background:'rgb(255, 87, 87', height:'30px'}}>New Arrival</h4>
            <div className="product-list">
            {newItems.map(product => (
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
            <h4 style={{marginBottom:'20px', textAlign:'center', background:'rgb(253, 253, 60)', height:'30px'}}>SALE</h4>
            <div className="product-list">
            {saleItems.map(product => (
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
        </div>
    )
}

export default Home;