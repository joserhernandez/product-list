const express = require('express');
const router = express.Router();

const Product = require('../models/product');

router.get('/', async (req, res) => {

    const products = await Product.find();
    res.json(products);
});

router.get('/:id', async (req, res) => {

    const product = await Product.findById(req.params.id);
    res.json(product);
});

router.post('/', async (req, res) => {
    const { name, price } = req.body;
    const product = new Product({
        name,
        price
    });
    await product.save();
    res.json({status: `Product Saved`});
});

router.put('/:id', async (req, res) => {
    const { name, price } = req.body;
    const newProduct = { name, price };
    await Product.findByIdAndUpdate(req.params.id, newProduct);
    res.json({status: 'Product Updated'});
})

router.delete('/:id', async (req, res) => {
    await Product.findByIdAndRemove(req.params.id);
    res.json({status: 'Task Deleted'});
})

module.exports = router;