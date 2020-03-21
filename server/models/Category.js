const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    title: {
        type: String,
        required: true,
        enum: ['Computers', 'Cars', 'Other'],
    }
});

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;