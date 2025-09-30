const products = require('../data/products');


 //GET All Products
exports.getProducts = (req, res) => {
    res.json({
        success: true,
        data: products
    });
};

//Get Product by ID
exports.getProductById = (req, res) => {
    const { id } = req.params;
    const product = products.find(p => p.id === id);
    if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, data: product });
};
