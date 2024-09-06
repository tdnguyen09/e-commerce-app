import React, { useContext, useEffect, useState } from "react";
import { WebContext } from "../WebContext";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import './DeleteProduct.css'

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
        fetch('https://final-project-database.onrender.com/dashboard',{
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
        <div id="delete-product-page">
            <input placeholder="Search product" type="text" name="searchItem" onChange={handleChange} value={input}/>
            <div id="result-to-show">
                {items.filter((item => {
                    return input.toLowerCase() === '' 
                    ? item
                    : item.name.toLowerCase().includes(input)
                })).map(item => (
                    <div className="admin-page-item" key={item.id}>
                        <img src={item.image} alt="image" />
                        <div>
                            <p><strong>{item.name}</strong></p>
                            <p>Price: ${item.price}</p>
                            <p>Discount: ${item.discount}</p>
                            <Link to={`/update-product/${item.id}`}><button style={{width:'80px', textDecoration:'none', marginLeft:'20px', marginRight:'20px', cursor:'pointer'}}>Update</button></Link>
                            <button style={{width:'80px', cursor:'pointer'}} onClick={() => handleDetete(item.id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div> 
        </div>
    )
}

export default DeleteProduct;