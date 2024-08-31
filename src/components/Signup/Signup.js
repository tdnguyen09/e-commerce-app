import React from "react";
import "./Signup.css"
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import * as yup from "yup";
import { useFormik } from "formik";


function Signup({ setUser }) {
    const history = useHistory()
    function checkEmail(email) {
        return fetch(`http://127.0.0.1:5000/checkemail?email=${encodeURIComponent(email)}`)
        .then(res => res.json())
        .then(data => {
            return data.available
        })
    }

    const formSchema = yup.object().shape({
        firstname: yup.string().required('Must enter the firstname').max(15),
        lastname: yup.string().required('Must enter the lastname').max(25),
        email: yup.string()
            .email('Invalid email')
            .required('Must enter email')
            .test(
                'CheckEmail',
                'Email is already registed',
                function (value) {
                    if(!value) return true;
                    return checkEmail(value)
                        .then(available => {
                            return available
                        })
                        .catch(() => {return false})
                }
            ),
        password: yup.string()
            .min(8,'Password must contain at least 8 characters long')
            .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
            .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .matches(/\d/, 'Password must contain at least one number')
            .required('Password is required'),
        confirmPassword: yup.string()
            .oneOf([yup.ref('password'), null], 'Password must match')
            .required('Confirm Password is required'),
        phone: yup.string().matches(/^[0-9]{10}/,'Phone number must be exactly 10 digits').required('Phone number is required'),
        address: yup.string().required('Address is required'),
        suburb: yup.string().required('Suburb is required'),
        state:yup.string().required('Please select the state'),
        postcode: yup.number()
            .typeError('Postcode must be a number')
            .integer('Postcode must be an integer')
            .positive('Postcode must be positive')
            .required('Postcode is required')
    })
    const formik = useFormik({
        initialValues: {
            firstname: "",
            lastname:"",
            email:"",
            password:"",
            confirmPassword:"",
            phone:"",
            address:"",
            suburb:"",
            state:"",
            postcode:""
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            const { confirmPassword, ...dataToSend } = values
            fetch("http://127.0.0.1:5000/signup",{
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(dataToSend),
            }).then( res => {
                if(res.ok) {
                    history.push('/logout')
                }
                return res.json()
            }).then (() => {
                setUser(values)
            })
        }
    })
    return (
        <div className="signup-page">   
            <h1>Register</h1>
            <h4>Please fill in the fields below:</h4>
            <form onSubmit={formik.handleSubmit}>
                <div className="input-container">
                    <input type="text" id="firstname-input" className="input-field" name="firstname" onChange={formik.handleChange} value={formik.values.firstname} />
                    <label htmlFor="firstname-input" className="input-label">Firstname</label>
                    {formik.touched.firstname && formik.errors.firstname ? <p>{formik.errors.firstname}</p>:null}
                </div>
                <div className="input-container">
                    <input type="text" id="lastname-input" className="input-field" name='lastname' onChange={formik.handleChange} value={formik.values.lastname} />
                    <label htmlFor="lastname-input" className="input-label">Lastname</label>
                    {formik.touched.lastname && formik.errors.lastname ? <p>{formik.errors.lastname}</p> : null}
                </div>
                <div className="input-container">
                    <input type="email" id="email-input-register" className="input-field" name="email" onChange={formik.handleChange} value={formik.values.email} />
                    <label htmlFor="email-input-register" className="input-label">Email</label>
                    <p>{formik.errors.email}</p>
                </div>
                <div className="input-container">
                    <input type="password" id="password-input-register" className="input-field" name="password" onChange={formik.handleChange} value={formik.values.password} />
                    <label htmlFor="password-input-register" className="input-label">Password</label>
                    <p>{formik.errors.password}</p>
                </div>
                <div className="input-container"> 
                    <input type="password" id="password-input-confirm" className="input-field" name="confirmPassword" onChange={formik.handleChange} value={formik.values.confirmPassword} />
                    <label htmlFor="password-input-confirm" className="input-label">Confirm Password</label>
                    {formik.touched.confirmPassword && formik.errors.confirmPassword ? <p>{formik.errors.confirmPassword}</p>:null}
                </div>
                <div className="input-container">
                    <input type="text" id="phone-input" className="input-field" name="phone" onChange={formik.handleChange} value={formik.values.phone} />
                    <label htmlForr="phone-input" className="input-label">Phone Number</label>
                    {formik.touched.phone && formik.errors.phone ? <p>{formik.errors.phone}</p>: null}
                </div>
                <div className="input-container">
                    <input type="text" id="address-input" className="input-field" name="address" onChange={formik.handleChange} value={formik.values.address} />
                    <label htmlForr="address-input" className="input-label">Address</label>
                    {formik.touched.address && formik.errors.address ? <p>{formik.errors.address}</p>: null}
                </div>
                <div id="address-additional-input">
                    <input type="text" id="suburb-input" placeholder="Suburb/City" name="suburb" className="address-input-field" onChange={formik.handleChange} value={formik.values.suburb} />
                    <select id="state-register" name="state" className="address-input-field" onChange={formik.handleChange} value={formik.values.state}>
                        <option>State</option>
                        <option value="ACT">ACT</option>
                        <option value="NSW">NSW</option>
                        <option value="NT">NT</option>
                        <option valuue="QLD">QLD</option>
                        <option value="SA">SA</option>
                        <option value="TAS">TAS</option>
                        <option value="VIC">VIC</option>
                        <option value="WA">WA</option>
                    </select>
                    <input type="text" id="postcode-input" placeholder="Postcode" className="address-input-field" name="postcode" onChange={formik.handleChange} value={formik.values.postcode} />
                </div>
                {formik.touched.suburb && formik.errors.suburb ? <p className="error-text">{formik.errors.suburb}</p> : null}
                {formik.touched.state && formik.errors.state ? <p className="error-text">{formik.errors.state}</p> : null}
                {formik.touched.postcode && formik.errors.postcode ? <p className="error-text">{formik.errors.postcode}</p> : null}
                <button id="btn-register" type="submit">CREATE ACCOUNT</button>
            </form>
            <p>
                Already have an account? 
                <span ><Link to="/login" id="login-link">Login</Link></span>
            </p>
        </div>
    )
}

export default Signup;