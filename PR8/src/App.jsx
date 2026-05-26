import { products } from './products';
import { Product } from './components/Product/Product';

function App() {
    return (
        <div>
            <header style={{ textAlign: "center", marginBottom: "20px" }}>
                <h1>React Еко-Магазин</h1>
            </header>
            <main style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                {products.map(p => (
                    <Product key={p.id} {...p} />
                ))}
            </main>
        </div>
    );
}

export default App;
