import React from 'react';
import { products } from './products';
import { Product } from './components/Product/Product';
import './App.css';

function App() {
    return (
        <div className="app-container">
            <header className="app-header">
                <h1>React Маркетплейс</h1>
                <p>Практична робота №8 — Компоненти, Props та Налагодження стану</p>
            </header>
            
            <main className="products-grid">
                {products.map(product => (
                    <Product 
                        key={product.id} 
                        title={product.title}
                        price={product.price}
                        img={product.img}
                    />
                ))}
            </main>
        </div>
    );
}

export default App;
