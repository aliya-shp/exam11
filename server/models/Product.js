
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 100,
    },
    price: {
        type: Number,
        required: true,
        validate: {
            validator: function(value) {
                return value > 0;
            },
            message: 'Price should be higher than zero',
        }
    },
    description: {
        type: String,
        required: true,
        minlength: 20,
        maxlength: 200,
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;