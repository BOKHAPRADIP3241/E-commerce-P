import { useCart } from "../context/CartContext";

export default function CartItem({ item }) {
    const { removeFromCart, updateQuantity } = useCart();

    const formatPrice = (price) =>
        new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(price);

    return (
        <div className="flex items-center justify-between bg-white shadow p-4 rounded-xl">
            {/* Product Image */}
            <div className="flex items-center gap-4">
                <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-lg object-cover"
                />
                <div>
                    <h3 className="font-medium text-gray-800">{item.name}</h3>
                    <p className="text-sm text-gray-500">{formatPrice(item.price)}</p>
                </div>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-2">
                <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                    -
                </button>
                <span className="font-medium">{item.quantity}</span>
                <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                    +
                </button>
            </div>

            {/* Total Price & Remove */}
            <div className="flex flex-col items-end">
                <span className="text-blue-600 font-bold">
                    {formatPrice(item.price * item.quantity)}
                </span>
                <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-xs text-red-500 hover:underline mt-1"
                >
                    Remove
                </button>
            </div>
        </div>
    );
}
