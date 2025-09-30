
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { ShoppingCart, Store, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
    const { cartCount, totalQuantity } = useCart();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto flex items-center justify-between px-6 py-4">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-blue-600 hover:text-blue-700 transition">
                    <Store className="w-7 h-7" />
                    <span>E-Shop</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-6">
                    <Link
                        to="/"
                        className="flex items-center gap-2 text-gray-700 font-medium hover:text-blue-600 transition"
                    >
                        <Store className="w-5 h-5" />
                        Products
                    </Link>

                    <Link
                        to="/cart"
                        className="flex items-center gap-2 text-gray-700 font-medium hover:text-blue-600 transition relative"
                    >
                        <div className="relative">
                            <ShoppingCart className="w-5 h-5" />
                            {/* Badge on Icon */}
                            {totalQuantity > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                                    {totalQuantity}
                                </span>
                            )}
                        </div>
                        Cart
                    </Link>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="md:hidden text-gray-700 hover:text-blue-600 transition"
                >
                    {mobileMenuOpen ? (
                        <X className="w-6 h-6" />
                    ) : (
                        <Menu className="w-6 h-6" />
                    )}
                </button>
            </div>

            {/* Mobile Navigation */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
                    <nav className="container mx-auto px-6 py-4 flex flex-col gap-4">
                        <Link
                            to="/"
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center gap-3 text-gray-700 font-medium hover:text-blue-600 transition py-2"
                        >
                            <Store className="w-5 h-5" />
                            Products
                        </Link>

                        <Link
                            to="/cart"
                            className="relative p-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                            title="Cart"
                        >
                            <ShoppingCart className="w-6 h-6" />
                            {totalQuantity > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                                    {totalQuantity}
                                </span>
                            )}
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
}