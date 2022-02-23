const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: Date,
        required: true,
        default: Date.now
    },
    created_by: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('Product', productSchema)