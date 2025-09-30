const orderSchema = require('../validators/orderValidator');
const products = require('../data/products');
const { v4: uuidv4 } = require('uuid');

const orders = [];

/**
 * POST /api/orders
 * Body: { firstName, lastName, address, cart: [{ productId, quantity }] }
 */
//Place Order
exports.placeOrder = (req, res) => {
    const { error, value } = orderSchema.validate(req.body, { abortEarly: false });

    if (error) {
        const details = error.details.map(d => d.message);
        return res.status(400).json({ success: false, message: 'Validation failed', details });
    }

    // Validate each cart item points to an existing product and compute totals
    let total = 0;
    const items = [];

    for (const item of value.cart) {
        const product = products.find(p => p.id === item.productId);
        if (!product) {
            return res.status(400).json({
                success: false,
                message: `Product with id "${item.productId}" not found`
            });
        }

        const subTotal = Number((product.price * item.quantity).toFixed(2));
        total += subTotal;

        items.push({
            productId: product.id,
            name: product.name,
            price: product.price,
            quantity: item.quantity,
            subTotal
        });
    }

    total = Number(total.toFixed(2));

    const order = {
        id: uuidv4(),
        customer: {
            firstName: value.firstName,
            lastName: value.lastName,
            address: value.address
        },
        items,
        total,
        createdAt: new Date().toISOString()
    };

    orders.push(order);

    // Return a success response
    res.status(201).json({
        success: true,
        message: 'Order placed successfully',
        orderId: order.id
    });
};
