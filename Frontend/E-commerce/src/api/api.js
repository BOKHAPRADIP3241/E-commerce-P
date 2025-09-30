const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export async function fetchProducts() {
    const res = await fetch(`${API_BASE}/products`);
    if (!res.ok) throw new Error("Failed to fetch products");
    const data = await res.json();
    return data.data;
}

export async function placeOrder(order) {
    const res = await fetch(`${API_BASE}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to place order");
    return data;
}
