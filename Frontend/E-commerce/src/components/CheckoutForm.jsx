import { useState } from "react";
import { placeOrder } from "../api/api";
import { useCart } from "../context/CartContext";

export default function CheckoutForm() {
    const { cart, clearCart } = useCart();
    const [form, setForm] = useState({ firstName: "", lastName: "", address: "" });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        try {
            const order = {
                ...form,
                cart: cart.map((item) => ({
                    productId: item.id,
                    quantity: item.quantity,
                })),
            };
            const res = await placeOrder(order);
            setMessage(res.message);
            clearCart();
            setForm({ firstName: "", lastName: "", address: "" });
        } catch (err) {
            setMessage(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-4 rounded-2xl shadow space-y-3"
        >
            <h2 className="font-bold text-lg">Checkout</h2>
            <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={form.firstName}
                onChange={handleChange}
                className="w-full border rounded p-2"
                required
            />
            <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={form.lastName}
                onChange={handleChange}
                className="w-full border rounded p-2"
                required
            />
            <textarea
                name="address"
                placeholder="Address"
                value={form.address}
                onChange={handleChange}
                className="w-full border rounded p-2"
                required
            />
            <button
                type="submit"
                disabled={loading}
                className="bg-green-600 text-white px-4 py-2 rounded-lg w-full"
            >
                {loading ? "Placing Order..." : "Place Order"}
            </button>
            {message && <p className="text-center text-sm mt-2">{message}</p>}
        </form>
    );
}
