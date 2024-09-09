import { useFormik } from "formik";
import React from "react";
import * as yup from "yup";
import './Add&UpdateProduct.css'


function AddProduct() {
    const formSchema = yup.object().shape({
        name: yup.string().required('Must enter the name'),
        image: yup.string().required('Must enter the image'),
        price: yup.number().positive().required('Must enter the price'),
        description: yup.string().required('Must enter the description'),
        depth: yup.number().positive().required('Must enter the depth of product'),
        weight: yup.number().positive().required('Must enter the weight of product'),
        height: yup.number().positive().required('Must enter the height of product'),
        width: yup.number().positive().required('Must enter the width of product'),
        new: yup.boolean().default(false),
        clearance: yup.boolean().default(false),
        sale: yup.boolean().default(false),
        preorder: yup.boolean().default(false),
        discount: yup.number().positive().nullable()
            .when(['clearance', 'sale'], {
                is: (clearance, sale) => clearance || sale,
                then: () => yup.number().required('Please enter the discount price'),
                otherwise: () => yup.number().nullable().default(0)
        }),
        brand: yup.string().required('Select the brand'),
        category: yup.string().required('Select the category')
    })
    const formik = useFormik({
        initialValues: {
            name:"",
            image:"",
            price:"",
            description:"",
            depth:"",
            weight:"",
            height:"",
            width:"",
            new:false,
            clearance:false,
            sale:false,
            preorder:false,
            discount:0,
            brand:"",
            category:""
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch('https://final-project-database.onrender.com/dashboard',{
            // fetch('http://127.0.0.1:5000/dashboard',{
                method:'POST',
                credentials:'include',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(values),
            })
            .then(res => res.json())
            .then(data => console.log(data))
        }
    })
   
    return (
        <div id="add-product-page">
            <h4 style={{textAlign:'center'}}>Add Product</h4>
            <form onSubmit={formik.handleSubmit} id="add-product-form">
                <div className="product-detail-wrapper">
                    <label htmlFor='name-product'>Name</label>
                    <input type='text 'id="name-product" className="product-field" name="name" onChange={formik.handleChange} value={formik.values.name} />
                </div>    
                {formik.touched.name && formik.errors.name ? <p className="error-text">{formik.errors.name}</p>:null}
                <div className="product-detail-wrapper">
                    <label htmlFor='image-product'>Image</label>
                    <input type="text" id="image-product" className="product-field" name='image' onChange={formik.handleChange} value={formik.values.image} />
                </div>    
                {formik.touched.image && formik.errors.image ? <p className="error-text">{formik.errors.image}</p>:null}
                <div className="product-detail-wrapper">
                    <label htmlFor='price-product'>Price</label>
                    <input type='number' id="price-product" className="product-field" name="price" onChange={formik.handleChange} value={formik.values.price} />
                </div>
                {formik.touched.price && formik.errors.price ? <p className="error-text">{formik.errors.price}</p>:null}
                <div className="product-detail-wrapper">
                    <label htmlFor='description-product'>Description</label>
                    <textarea rows='5' id="description-product" className="product-field" name="description" onChange={formik.handleChange} value={formik.values.description} />
                </div>
                {formik.touched.description && formik.errors.description? <p className="error-text">{formik.errors.description}</p>:null}
                <div className="product-detail-wrapper">
                    <label htmlFor='depth-product'>Product Depth</label>
                    <input type="number" id="depth-product" className="product-field" name="depth" onChange={formik.handleChange} value={formik.values.depth} />
                </div>
                {formik.touched.depth && formik.errors.depth ? <p className="error-text">{formik.errors.depth}</p>:null}
                <div className="product-detail-wrapper">
                    <label htmlFor='weight-product'>Product Weight</label>
                    <input type="number" id="weight-product" className="product-field" name="weight" onChange={formik.handleChange} value={formik.values.weight} />
                </div>
                {formik.touched.weight && formik.errors.weight ? <p className="error-text">{formik.errors.weight}</p>:null}
                <div className="product-detail-wrapper">
                    <label htmlFor='height-product'>Product Height</label>
                    <input type="number" id='height-product' className="product-field" name="height" onChange={formik.handleChange} value={formik.values.height} />
                </div>  
                {formik.touched.height && formik.errors.height ? <p className="error-text">{formik.errors.height}</p>:null}
                <div className="product-detail-wrapper">
                    <label htmlFor='width-product'>Product Width</label>
                    <input type="number" id="width-product" className="product-field" name="width" onChange={formik.handleChange} value={formik.values.width} />
                </div>
                {formik.touched.width && formik.errors.width ? <p className="error-text">{formik.errors.width}</p> : null}
                <div className="product-detail-wrapper-checkbox">
                    <input type="checkbox" id="new-product" className="product-checkbox" name="new" onChange={formik.handleChange} checked={formik.values.new} />
                    <label htmlFor='new-product'>New Product</label>
                    <input type="checkbox" id="clearance-product" className="product-checkbox" name="clearance" onChange={formik.handleChange} checked={formik.values.clearance} />
                    <label htmlFor='clearance-product'>Clearance Product</label>
                    <input type="checkbox" id="sale-product" className="product-checkbox" name="sale" onChange={formik.handleChange} checked={formik.values.sale} />
                    <label htmlFor='sale-product'>Sale Product</label>
                    <input type="checkbox" id="pre-order-product" className="product-checkbox" name="preorder" onChange={formik.handleChange} checked={formik.values.preorder} />
                    <label htmlFor='pre-order'>Pre-Order</label>
                </div>
                <div className="product-detail-wrapper">
                    <label htmlFor='discount-product'>Discount Price</label>
                    <input type="number" id="discount-product" className="product-field" name="discount" onChange={formik.handleChange} value={formik.values.discount} />
                </div>
                {formik.touched.discount && formik.errors.discount ? <p className="error-text">{formik.errors.discount}</p>: null}
                <div className="product-detail-wrapper">
                    <label htmlFor='brand'>Brand</label>
                    <select name="brand" id="brand" className="selection" onChange={formik.handleChange} value={formik.values.brand}>
                        <option>Select brand</option>
                        <option value='barbie'>Barbie</option>
                        <option value='disney'>Disney</option>
                        <option value='fisher-price'>Fisher-Price</option>
                        <option value='nerf'>Nerf</option>
                        <option value='hot wheels'>Hot Wheels</option>
                        <option value='lego'>Lego</option>
                        <option value='pokemon'>Pokemon</option>
                        <option value='vtech'>VTech</option>
                        <option value='others'>Others</option>
                    </select>
                </div>
                {formik.touched.brand && formik.errors.brand ? <p className="error-text">{formik.errors.brand}</p>:null}
                <div className="product-detail-wrapper">
                    <label htmlFor='category'>Category</label>
                    <select name="category" id="category" className='selection' onChange={formik.handleChange} value={formik.values.category}>
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
                </div>
                    {formik.touched.category && formik.errors.category ? <p className="error-text">{formik.errors.category}</p>:null}
                <button className='add-update-btn' type="submit" style={{cursor:'pointer'}}>Add Product</button>
            </form>
        </div>
    )
}

export default AddProduct