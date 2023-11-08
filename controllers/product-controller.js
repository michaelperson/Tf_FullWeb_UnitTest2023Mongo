const Product = require('../models/product');

const productController = {
    getAll: async (req, res) => {
        const products = await Product.find();
        res.status(200).json(products);
    },

    getOne: async (req, res) => {
        const {id} = req.params;
        const product = await Product.findById(id);
        if(!product) {
            return res.sendStatus(404);
        }
        res.status(200).json(product);
    },
    
    insert: async (req, res) => {
        const newProduct = Product(req.body);
        await newProduct.save();
        res.status(200).json(newProduct);
    },
    
    update: async (req, res) => {
        res.sendStatus(204);
    },
    
    delete: async (req, res) => {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);

        if(!product) {
            return res.sendStatus(404);
        }
        res.status(200).json(product);
    }
};

module.exports = productController;