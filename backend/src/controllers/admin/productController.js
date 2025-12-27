const productService = require('../../services/admin/productService');
const asyncHandler = require('../../utils/asyncHandler');
const AppError = require('../../utils/AppError');
const { HTTP_CODES, MESSAGES } = require('../../utils/constants');

const productController = {
    // Get All Products (for dashboard)
    getAllProducts: asyncHandler(async (req, res) => {
        const products = await productService.getAllProducts();
        res.json(products);
    }),

    // Get Product By ID
    getProductById: asyncHandler(async (req, res) => {
        const { id } = req.params;
        const product = await productService.getProductById(id);

        if (!product) {
            throw new AppError(MESSAGES.NOT_FOUND, HTTP_CODES.NOT_FOUND);
        }
        res.json(product);
    }),

    // Create Product
    createProduct: asyncHandler(async (req, res) => {
        const newProduct = await productService.createProduct(req.body);
        res.status(HTTP_CODES.CREATED).json({
            success: true,
            message: 'Producto creado correctamente.',
            product: newProduct
        });
    }),

    // Update Product
    editProduct: asyncHandler(async (req, res) => {
        const { id } = req.params;
        const success = await productService.updateProduct(id, req.body);

        if (!success) {
            throw new AppError('Producto no encontrado o no modificado', HTTP_CODES.NOT_FOUND);
        }

        res.json({ success: true, message: 'Producto actualizado' });
    }),

    // Delete Product
    deleteProduct: asyncHandler(async (req, res) => {
        const { id } = req.params;
        const success = await productService.deleteProduct(id);

        if (!success) {
            throw new AppError(MESSAGES.NOT_FOUND, HTTP_CODES.NOT_FOUND);
        }

        res.json({ success: true, message: 'Producto eliminado' });
    })
};

module.exports = productController;
