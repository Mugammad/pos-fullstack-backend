//MUGAMMAD BREDA WROTE THIS CODE....WELL....MOST OF IT

const Product = require('../models/product')

getProduct = async (req, res, next) => {
    let product
    try {
        product = await Product.findById(req.params.id)
        if(!product) {
            return res.status(404).json({message: 'Cannot find product'})
        }
    } catch (error) {
        return res.status(500).json({message: error.message})
    }

    res.product = product
    next()
}

module.exports = getProduct