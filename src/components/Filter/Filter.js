import React, { useState } from "react";
import './Filter.css'


function Filter({ products, onFilter }) {
    const [sortOptions, setSortOptions] = useState({
        name: false,
        priceAsc: false,
        priceDesc: false
    })
    const [price, setPrice] = useState({
        min:'',
        max:'',
    })

    function handleCheckboxChange(e){
        const {name, checked} = e.target;
        let updatedSortedOptions = {...sortOptions}

        if (name === 'priceAsc') {
            updatedSortedOptions = {
                name:false,
                priceAsc: checked,
                printDesc: false
            }
        }else if (name === 'priceDesc') {
            updatedSortedOptions = {
                name:false,
                priceAsc:false,
                priceDesc: checked
            }
        } else if (name === 'name') {
            updatedSortedOptions = {
                name: checked,
                priceAsc:false,
                priceDesc:false
            }
        } else {
            updatedSortedOptions[name] = checked
        }
        setSortOptions(updatedSortedOptions)
        sortedProducts(updatedSortedOptions, price.min, price.max)
    }
    function handleChange(e){
        const {name, value} = e.target
        setPrice({
            ...price,
            [name]: value
        })
    }
    
    function handleClick() {
        sortedProducts(sortOptions, price.min, price.max)
    }

    function sortedProducts(sortOptions, min, max) {
        let filteredProducts = [...products]
        const minPrice = parseFloat(min) || 0;
        const maxPrice = parseFloat(max) || Infinity;
        filteredProducts = filteredProducts.filter(product => 
            product.price >= minPrice && product.price <= maxPrice)

        if (sortOptions.name) {
            filteredProducts.sort((a,b) => a.name.localeCompare(b.name))
        }
        if (sortOptions.priceAsc){
            filteredProducts.sort((a,b) => a.price - b.price)
        }else if (sortOptions.priceDesc) {
            filteredProducts.sort((a,b) => b.price - a.price)
        }

        onFilter(filteredProducts)
    }

    function reset (){
        setPrice({
            min:'',
            max:'',
        })
        onFilter([...products])
    }
    return(
        <>
        <div id="filter-bar">
            <section>
                <input type="checkbox" className="filter-checkbox" name="name" checked={sortOptions.name} onChange={handleCheckboxChange} />
                <label >Sort by Name(A-Z)</label>
            </section>
            <section>
                <input type="checkbox" className="filter-checkbox" name="priceAsc" checked={sortOptions.priceAsc} onChange={handleCheckboxChange}/>
                <label>Sort by Price (Low to High)</label>
            </section>
            <section>
                <input type="checkbox" className="filter-checkbox" name='priceDesc' checked={sortOptions.priceDesc} onChange={handleCheckboxChange}/>
                <label>Sort by Price (High to Low)</label>
            </section>
            <div id="advanced-filter">
                <label>Price:</label>
                <span> Min $</span><input type="number" step="any" className="filter-price" name="min" value={price.min} onChange={handleChange} />
                <button onClick={() => reset()}>Reset</button>
                <span>Max $</span><input type="number"  step="any" className="filter-price" name='max' value={price.max} onChange={handleChange}/>
                <button onClick={handleClick}>Apply</button>
            </div>
        </div>
        </>
    )
}

export default Filter;