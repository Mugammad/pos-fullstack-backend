const express = require('express')
const router = express.Router()
const Product = require('../models/product')

//Getting all
router.get('/', async (req, res) => {
    try {
        const products = await Product.find()
        res.json(products)
    } catch (err){
        res.status(500).json({message: err.message})
    }
})

//Getting one
router.get('/:id', getProduct, (req, res) => {
    res.send(res.product.title)
})

//Creating one
router.post('/', async (req, res) => {
    let { title, category, description, img, price, created_by} = req.body
    const product = new Product({
        title,
        category,
        description,
        img,
        price,
        created_by
    })

    try {
        const newProduct = await product.save()
        res.status(201).json(newProduct)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

//Updating one
// router.patch('/:id', getSubscriber, async (req, res) => {
//     if(req.body.name != null) {
//         res.subscriber.name = req.body.name
//     }
//     if(req.body.subscribedToChannel != null) {
//         res.subscriber.subscribedToChannel = req.body.subscribedToChannel
//     }
//     try {
//         const updatedSubscriber = await res.subscriber.save()
//         res.json(updatedSubscriber)
//     } catch (error) {
//         res.status(400).json({message: error.message})
//     }
// })

//Deleting one
router.delete('/:id', getProduct, async (req, res) => {
    try {
        await res.product.remove()
        res.json({message: 'Product deleted'})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

async function getProduct(req, res, next) {
    let product
    try {
        product = await Product.findById(req.params.id)
        if(subscriber == null) {
            return res.status(404).json({message: 'Cannot find product'})
        }
    } catch (error) {
        return res.status(500).json({message: error.message})
    }

    res.product = product
    next()
}

module.exports = router