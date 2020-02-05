import React from 'react';
import { Link } from 'react-router-dom';
import queryString from 'querystring';

import './styles.css';


function Product() {
    
    let params = queryString.parse(window.location.search);

    console.log(params)

    return (
        <div className="product-container">
            <div className="product-details">
                <h3>Product Details</h3>
                <p><strong>ID:</strong><br/> {params.pid}</p>
                <p><strong>Cycle:</strong><br/> {params.billingcycle}</p>
                <p><strong>Promo Code:</strong><br/> {params.promocode}</p>
            </div>

            <Link to="/">Voltar</Link>
        </div>
)}

export default Product;