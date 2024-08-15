import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

function UpdateProduct() {
    const { id } = useParams()
    const [product, setProduct] = useState({}); 

    useEffect(() => {
        fetch(`http://127.0.0.1:5000/products/${id}`)
        .then(res => res.json())
        .then(data => setProduct(data))
    },[id])

    function handleChange(e){
        let name = e.target.name;
        let value = e.target.value;
        if (e.target.type === "checkbox"){
            value = e.target.checked
        }
        setProduct({
            ...product,
            [name]: value
        })
    }
    function handleUpdate(){
        fetch(`http://127.0.0.1:5000/products/${id}`,{
            method: 'PATCH',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify(product)
        })
        .then(res => {
            if(res.ok) {
                res.json()
            } else {
                console.log(res.message)
            }
        })
        .then(res => console.log(res))
    }
    console.log(product)
    return (
        <div id="product-update-page">
            <form>
                <div className="product-detail-wrapper">
                    <label for='update-name'>Name</label>
                    <input type="text" id="update-name" name="name" className="product-field" defaultValue={product.name} onChange={handleChange} value={product.name}/>
                </div>
                <div className="product-detail-wrapper">
                    <label for='update-image'>Image</label>
                    <input type="text" id="update-image" name="image" className="product-field" defaultValue={product.image} onChange={handleChange} value={product.image} />
                </div>
                <div className="product-detail-wrapper">
                    <label for='update-price'>Price</label>
                    <input type="text" id="update-price" name="price" className="product-field" defaultValue={product.price} onChange={handleChange} value={product.price}/>
                </div>
                <div className="product-detail-wrapper">
                    <label for='update-description'>Description</label>
                    <input type="text" id="update-description" name="description" className="product-field" defaultValue={product.description} onChange={handleChange} value={product.description} />
                </div>
                <div className="product-detail-wrapper">
                    <label for='update-depth'>Product Depth</label>
                    <input type="text" id="update-depth" name="product_depth" className="product-field" defaultValue={product.product_depth} onChange={handleChange} value={product.product_depth} />
                </div>
                <div className="product-detail-wrapper">
                    <label for='update-weight'>Product Weight</label>
                    <input type="text" id="update-weight" name="uproduct_weight" className="product-field" defaultValue={product.product_weight} onChange={handleChange} value={product.product_weight} />
                </div>
                <div className="product-detail-wrapper">
                    <label for='update-height'>Product Height</label>
                    <input type="text" id="update-height" name="product_height" className="product-field" defaultValue={product.product_height} onChange={handleChange} value={product.product_height} />
                </div>
                <div className="product-detail-wrapper">
                    <label for='update-width'>Product Width</label>
                    <input type="text" id="update-width" name="product_width" className="product-field" defaultValue={product.product_width} onChange={handleChange} value={product.product_width} />
                </div>
                <div className="product-detail-wrapper">
                    <label for='update-new'>New Product</label>
                    <input type="checkbox" id="update-new" name="is_it_new" className="product-checkbox" defaultChecked={product.is_it_new} onChange={handleChange} value={product.is_it_new} />
                    <label for='update-clearance'>Clearance Product</label>
                    <input type="checkbox" id="update-clearance" name="is_it_clearance" className="product-checkbox" defaultChecked={product.is_it_clearance} onChange={handleChange} value={product.is_it_clearance} />
                    <label for='update-sale'>Sale Product</label>
                    <input type="checkbox" id="update-sale" name="is_it_onsale" className="product-checkbox" defaultChecked={product.is_it_onsale} onChange={handleChange} value={product.is_it_onsale} />
                </div>
                <div className="product-detail-wrapper">
                    <label for='update-discount'>Discount Price</label>
                    <input type="text" id="update-discount" name="discount" className="product-field" defaultValue={product.discount} onChange={handleChange} value={product.discount} />
                </div>
                <button onClick={() => handleUpdate()}>Update</button>
            </form>
        </div>
    )
}

export default UpdateProduct;