import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import './AdminDashBoard.css'

function AdminDashboard({ admin }) {
    return (
        <div id="admin-dashboard-page">
            <h1>Hello, {admin.username} </h1>
            <nav>
                <Link to='/add-new-product' className='nav-admin'>Add New Product</Link>
                <Link to='/delete-product'className='nav-admin'>Update and Delete Product</Link>
            </nav>
        </div>
    )
}

export default AdminDashboard;