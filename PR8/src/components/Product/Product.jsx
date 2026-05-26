import React, { useState } from 'react';
import './Product.css';

export const Product = ({ title, price, img }) => {
    // Власний ізольований стан лічильника для кожного екземпляра товару
    const [count, setCount] = useState(0);

    const handleBuy = () => {
        setCount(count + 1);
    };

    return (
        <div className="product-card">
            <div className="product-img-wrapper">
                <img src={img} alt={title} className="product-img" />
            </div>
            <h3 className="product-title">{title}</h3>
            <p className="product-price">Ціна: <strong>{price} грн</strong></p>
            <div className="product-status">
                <p>Додано в кошик: <strong>{count}</strong> шт.</p>
            </div>
            <button className="buy-button" onClick={handleBuy}>Купити</button>
        </div>
    );
};
