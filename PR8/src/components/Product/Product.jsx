import { useState } from 'react';

export const Product = ({ title, price, img }) => {
    const [count, setCount] = useState(0);

    const handleBuy = () => {
        setCount(count + 1);
    };

    return (
        <div style={{ border: "1px solid #ccc", padding: "15px", margin: "10px", textAlign: "center" }}>
            <img src={img} alt={title} style={{ width: "100%", height: "200px", objectFit: "contain" }} />
            <h3>{title}</h3>
            <p>Ціна: <strong>{price} грн</strong></p>
            <p>В кошику: <strong>{count}</strong> шт.</p>
            <button onClick={handleBuy}>Додати в кошик</button>
        </div>
    );
};
