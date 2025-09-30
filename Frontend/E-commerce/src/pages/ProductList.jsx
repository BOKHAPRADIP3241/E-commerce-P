import { useEffect, useState } from "react";
import { fetchProducts } from "../api/api";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const { addToCart } = useCart();

    useEffect(() => {
        fetchProducts().then(setProducts);
    }, []);

    return (
        <div className="container mx-auto px-6 py-8">
            <h1 className="text-3xl font-bold mb-6">Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((p) => (
                    <ProductCard key={p.id} product={p} onAddToCart={addToCart} />
                ))}
            </div>
        </div>
    );
}
