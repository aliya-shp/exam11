const path = require('path');

const express = require('express');
const multer = require('multer');
const nanoid = require('nanoid');

const config = require('../config');
const auth = require('../middleware/auth');

const Product = require('../models/Product');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

const router = express.Router();

router.get('/', async (req, res) => {
    const products = await Product.find().populate('category');
    res.send(products);
});

router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).send({message: 'Not found'});
        }

        res.send(product);
    } catch (e) {
        res.status(404).send({message: 'Not found'});
    }
});

router.post('/', auth, upload.single('image'), async (req, res) => {
    if (req.user._id.equals(req.body.user)) {
        const productData = req.body;

        if (req.file) {
            productData.image = req.file.filename;
        }

        const product = new Product(productData);

        try {
            await product.save();

            return res.send({id: product._id});
        } catch (e) {
            return res.status(400).send(e);
        }
    } else {
        return res.status(403).send({message: 'Sorry, no way!'})
    }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product.user.equals(req.user._id)) {
            product.delete();
            return res.send({message: 'Successfully deleted'});
        }
        return res.status(403).send({message: 'Oops, nothing'});

    } catch (error) {
        res.status(500).send({error});
    }
});

module.exports = router;