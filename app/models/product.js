//MUGAMMAD BREDA WROTE THIS CODE....WELL....MOST OF IT

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
        type: String,
        required: true
    },
    created_by: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('Product', productSchema)