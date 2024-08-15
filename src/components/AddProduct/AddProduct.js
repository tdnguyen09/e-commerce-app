import React, { useState } from "react";


function AddProduct() {
    const [addProductForm, setAddProductForm] = useState({
        productName:'',
        productImage:'',
        productPrice:'',
        productDescription:'',
        productDepth:'',
        productWeight:'',
        productHeight:'',
        productWidth:'',
        discount:''
    })
    const [checkbox, setCheckbox] = useState({
        newProduct: false,
        clearanceProduct: false,
        saleProduct:false
    })

    function handleChange(event) {
        let name = event.target.name
        let value = event.target.value

        setAddProductForm  ({
            ...addProductForm,
            [name]: value,
        })
    }

    function handleCheckboxChange (e) {
        let name = e.target.name
        let checked = e.target.checked
        setCheckbox({
            ...checkbox,
            [name]: checked,
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        const productData = {
          name:addProductForm.productName,
          image:addProductForm.productImage,
          price:addProductForm.productPrice,
          description:addProductForm.productDescription,
          depth:addProductForm.productDepth,
          weigth:addProductForm.productWeight,
          height:addProductForm.productHeight,
          width:addProductForm.productWidth,
          discount:addProductForm.discount,
          new: checkbox.newProduct,
          clearance: checkbox.clearanceProduct,
          sale: checkbox.saleProduct
        }
        fetch("http://127.0.0.1:5000/dashboard", {
            method:"POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(productData),
        })
            .then( res => {
                if (res.status === 200) {
                    console.log('successfully')
                }
                return res.json()
            })
            .then(productData => console.log(productData))
            
            setAddProductForm({
                productName:'',
                productImage:'',
                productPrice:'',
                productDescription:'',
                productDepth:'',
                productWeight:'',
                productHeight:'',
                productWidth:'',
                discount:''
            })
            setCheckbox({
                newProduct: false,
                clearanceProduct: false,
                saleProduct:false
            })
    }
    return (
        <div className="add-product-page">
            <form onSubmit={handleSubmit} className="add-product-form">
                <div className="product-detail-wrapper"></div>
                    <label for='name-product'>Name</label>
                    <input type='text 'id="name-product" className="product-field" name="productName" onChange={handleChange} value={addProductForm.productName} required />
                <div className="product-detail-wrapper"></div>
                    <label for='image-product'>Image</label>
                    <input type="text" id="image-product" className="product-field" name='productImage' onChange={handleChange} value={addProductForm.productImage} required />
                <div className="product-detail-wrapper">
                    <label for='price-product'>Price</label>
                    <input type='text' id="price-product" className="product-field" name="productPrice" onChange={handleChange} value={addProductForm.productPrice} required />
                </div>
                <div className="product-detail-wrapper">
                    <label for='description-product'>Description</label>
                    <input type="text" id="description-product" className="product-field" name="productDescription" onChange={handleChange} value={addProductForm.productDescription} required />
                </div>
                <div className="product-detail-wrapper">
                    <label for='depth-product'>Product Depth</label>
                    <input type="text" id="depth-product" className="product-field" name="productDepth" onChange={handleChange} value={addProductForm.productDepth} required />
                </div>
                <div className="product-detail-wrapper">
                    <label for='weight-product'>Product Weight</label>
                    <input type="text" id="weight-product" className="product-field" name="productWeight" onChange={handleChange} value={addProductForm.productWeight} required />
                </div>
                <div className="product-detail-wrapper">
                    <label for='height-product'>Product Height</label>
                    <input type="text" id='height-product' className="product-field" name="productHeight" onChange={handleChange} value={addProductForm.productHeight} required />
                </div>
                <div className="product-detail-wrapper">
                    <label for='width-product'>Product Width</label>
                    <input type="text" id="width-product" className="product-field" name="productWidth" onChange={handleChange} value={addProductForm.productWidth} required />
                </div>
                <div className="product-detail-wrapper">
                    <label for='new-product'>New Product</label>
                    <input type="checkbox" id="new-product" className="product-checkbox" name="newProduct" onChange={handleCheckboxChange} checked={checkbox.newProduct} />
                    <label for='clearance-product'>Clearance Product</label>
                    <input type="checkbox" id="clearance-product" className="product-checkbox" name="clearanceProduct" onChange={handleCheckboxChange} checked={checkbox.clearanceProduct} />
                    <label for='sale-product'>Sale Product</label>
                    <input type="checkbox" id="sale-product" className="product-checkbox" name="saleProduct" onChange={handleCheckboxChange} checked={checkbox.saleProduct} />
                </div>
                <div className="product-detail-wrapper">
                    <label for='discount-product'>Discount Price</label>
                    <input type="text" id="discount-product" className="product-field" name="discount" onChange={handleChange} value={addProductForm.discount} />
                </div>
                <button type="submit">Add Product</button>
            </form>
        </div>
    )
}

export default AddProduct