import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Header() {
    const { cart } = useCart();

    return (
        <header className="bg-white shadow p-4 flex justify-between items-center">
            <Link to="/" className="text-xl font-bold text-blue-600">
                E-Shop
            </Link>
            <Link
                to="/cart"
                className="relative px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
                Cart
                {cart.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                        {cart.reduce((sum, item) => sum + item.quantity, 0)}
                    </span>
                )}
            </Link>
        </header>
    );
}
