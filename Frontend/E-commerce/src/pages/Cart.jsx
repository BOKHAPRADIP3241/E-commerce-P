import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { placeOrder } from "../api/api";
import CartItem from "../components/CartItem";
import Input from "../components/Input";
import Button from "../components/Button";
import { CheckCircle, Package, MapPin, User, ShoppingBag } from "lucide-react";

export default function Cart() {
    const navigate = useNavigate();
    const { cart, total, clearCart } = useCart();
    const [form, setForm] = useState({ firstName: "", lastName: "", address: "" });
    const [errors, setErrors] = useState({ firstName: "", lastName: "", address: "" });
    const [orderSuccess, setOrderSuccess] = useState(false);
    const [orderId, setOrderId] = useState("");
    const [orderTotal, setOrderTotal] = useState(0);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: "" });
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!form.firstName.trim()) {
            newErrors.firstName = "First name is required";
        }

        if (!form.lastName.trim()) {
            newErrors.lastName = "Last name is required";
        }

        if (!form.address.trim()) {
            newErrors.address = "Address is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleOrder = async () => {
        // Validate form before submitting
        if (!validateForm()) {
            return;
        }

        setLoading(true);
        try {
            const finalTotal = total + 99;
            setOrderTotal(finalTotal);

            const res = await placeOrder({
                ...form,
                cart: cart.map(item => ({
                    productId: item.id,
                    quantity: item.quantity
                }))
            });
            setOrderId(res.orderId);
            setOrderSuccess(true);
            clearCart();
        } catch (err) {
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    const formatPrice = (price) =>
        new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(price);

    // Order Success View
    if (orderSuccess) {
        return (
            <div className="container mx-auto px-6 py-8">
                <div className="max-w-2xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle className="w-12 h-12 text-green-600" />
                        </div>

                        <h1 className="text-3xl font-bold text-gray-800 mb-2">Order Placed Successfully!</h1>
                        <p className="text-gray-600 mb-6">Thank you for your purchase</p>

                        <div className="bg-gray-50 rounded-lg p-4 mb-6">
                            <p className="text-sm text-gray-600 mb-1">Order ID</p>
                            <p className="text-xl font-mono font-bold text-gray-800">{orderId}</p>
                        </div>

                        <div className="border-t border-b border-gray-200 py-6 mb-6 space-y-4">
                            <div className="flex items-start gap-3 text-left">
                                <User className="w-5 h-5 text-gray-400 mt-1" />
                                <div>
                                    <p className="text-sm text-gray-600">Customer</p>
                                    <p className="font-semibold">{form.firstName} {form.lastName}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 text-left">
                                <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                                <div>
                                    <p className="text-sm text-gray-600">Delivery Address</p>
                                    <p className="font-semibold">{form.address}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 text-left">
                                <Package className="w-5 h-5 text-gray-400 mt-1" />
                                <div>
                                    <p className="text-sm text-gray-600">Total Amount</p>
                                    <p className="font-semibold text-lg">{formatPrice(orderTotal)}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                            <p className="text-sm text-blue-800">
                                📧 A confirmation email has been sent to your registered email address
                            </p>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => navigate("/")}
                                className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
                            >
                                Continue Shopping
                            </button>
                            <button
                                onClick={() => navigate("/orders")}
                                className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                            >
                                View Orders
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Cart View
    return (
        <div className="container mx-auto px-6 py-8">
            <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

            {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 px-4">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                        <ShoppingBag className="w-12 h-12 text-gray-400" />
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">Your cart is empty</h2>
                    <p className="text-gray-500 mb-8 text-center max-w-md">
                        Looks like you haven't added anything to your cart yet. Start shopping to find amazing products!
                    </p>
                    <button
                        onClick={() => navigate("/")}
                        className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center gap-2"
                    >
                        <ShoppingBag className="w-5 h-5" />
                        Continue Shopping
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {cart.map((item) => (
                            <CartItem key={item.id} item={item} />
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="bg-white shadow rounded-xl p-6 space-y-4 h-fit">
                        <h2 className="text-xl font-semibold">Order Summary</h2>
                        <div className="flex justify-between text-gray-600">
                            <span>Subtotal</span>
                            <span>{formatPrice(total)}</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                            <span>Shipping</span>
                            <span>₹99</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold border-t pt-2">
                            <span>Total</span>
                            <span>{formatPrice(total + 99)}</span>
                        </div>

                        <div className="pt-4 space-y-3">
                            <Input
                                label="First Name"
                                name="firstName"
                                value={form.firstName}
                                onChange={handleChange}
                                error={errors.firstName}
                                required
                            />
                            <Input
                                label="Last Name"
                                name="lastName"
                                value={form.lastName}
                                onChange={handleChange}
                                error={errors.lastName}
                                required
                            />
                            <Input
                                label="Address"
                                name="address"
                                value={form.address}
                                onChange={handleChange}
                                error={errors.address}
                                required
                            />
                            <Button onClick={handleOrder} disabled={loading}>
                                {loading ? "Placing Order..." : "Place Order"}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}