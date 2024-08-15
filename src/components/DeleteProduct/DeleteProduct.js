import React, { useContext, useEffect, useState } from "react";
import { WebContext } from "../WebContext";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function DeleteProduct() {
    const context = useContext(WebContext)
    const allItems = context.allProducts
    const [items, setItems] = useState([]);
    const [input, setInput] = useState('');
    
    useEffect(() => {
        setItems(allItems)
    },[allItems])

    function handleChange(e) {
        setInput(e.target.value)
    }

    function handleDetete(index){
        fetch('http://127.0.0.1:5000/dashboard',{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify({id: index})
        })
        .then(res => res.json())
        .then(() => {
            const updateItems = items.filter(item => item.id !== index)
            setItems(updateItems);
        })

    }
    return (
        <div className="delete-product-page">
            <input type="text" id="search-items" name="searchItem" onChange={handleChange} value={input}/>
            <ul className="result">
                {items.filter((item => {
                    return input.toLowerCase() === '' 
                    ? item
                    : item.name.toLowerCase().includes(input)
                })).map(item => (
                    <div key={item.id}>
                        {/* <img src={item.name} alt="image" /> */}
                        <p>{item.name}</p>
                        <p>${item.price}</p>
                        <p>${item.discount}</p>
                        <button><Link to={`/update-product/${item.id}`}>Update</Link></button>
                        <button onClick={() => handleDetete(item.id)}>Delete</button>
                    </div>
                ))}
            </ul> 
        </div>
    )
}

export default DeleteProduct;