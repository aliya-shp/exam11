import React from 'react';
import {NavLink} from "react-router-dom";

const renderCategories = (categories, fetchProducts) => {
    return categories.map(category => (
        <div key={category._id}>
            <NavLink className='btn btn-link' style={{color: 'black'}} onClick={() => fetchProducts(category._id)} to="/">{category.title}</NavLink>
        </div>
    ))
};

const Sidebar = ({categories, fetchProducts}) => {
    return (
        <div style={{width: '300px', marginRight: '50px'}}>
            <div className="card">
                <article className="card-group-item">
                    <header className="card-header">
                        <h6 className="title">Categories</h6>
                    </header>
                    <div>
                        {categories && renderCategories(categories, fetchProducts)}
                    </div>
                </article>
            </div>
        </div>
    );
};

export default Sidebar;