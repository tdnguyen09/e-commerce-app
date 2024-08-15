import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function AdminDashboard() {
    return (
        <div className="admin-dashboard-page">
            <h1>Hello, </h1>
            <nav>
                <Link to='/add-new-product'>Add New Product</Link>
                <Link to='/update-product'>Update Product</Link>
                <Link to='/delete-product'>Delete Product</Link>
            </nav>
        </div>
    )
}

export default AdminDashboard;