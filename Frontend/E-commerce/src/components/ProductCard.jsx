import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
    const { addToCart } = useCart();

    const oldPrice = Math.floor(product.price * (1 + (Math.random() * 0.3 + 0.1)));

    // Format price in INR
    const formatPrice = (price) =>
        new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(price);

    return (
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 relative flex flex-col border border-gray-100">

            {/* Product Badge */}
            <span className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-md">
                New
            </span>

            {/* Product Image */}
            <div className="overflow-hidden rounded-t-2xl h-56 bg-gray-50 flex items-center justify-center">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
            </div>

            {/* Card Content */}
            <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-gray-900 truncate">{product.name}</h3>
                <p className="text-sm text-gray-500 flex-grow mt-1 leading-snug line-clamp-2">
                    {product.description}
                </p>

                {/* Rating */}
                <div className="flex items-center mt-3 mb-4">
                    <div className="flex text-yellow-400 text-base">★★★★☆</div>
                    <span className="text-gray-500 text-sm ml-2">(120)</span>
                </div>

                {/* Price + Add to Cart */}
                <div className="flex items-center justify-between mt-auto">
                    <div className="flex flex-col">
                        <span className="text-xl font-bold text-blue-600">
                            {formatPrice(product.price)}
                        </span>
                        <span className="text-sm text-gray-400 line-through">
                            {formatPrice(oldPrice)}
                        </span>
                    </div>

                    <button
                        onClick={() => addToCart(product)}
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2 rounded-xl shadow-md hover:shadow-lg hover:from-blue-700 hover:to-indigo-700 transition font-medium"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}
