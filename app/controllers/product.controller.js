//MUGAMMAD BREDA WROTE THIS CODE....WELL....MOST OF IT

const Product = require('../models/product')

exports.getAll = async (req, res) => {
    try {
        const products = await Product.find()
        res.json({products})
    } catch (err){
        res.status(500).json({message: err.message})
    }
}

exports.getOne = (req, res) => {
    res.send(res.product.title)
}

exports.createProduct = async (req, res) => {
    let { title, category, description, img, price} = req.body
    const product = new Product({
        title,
        category,
        description,
        img,
        price,
        created_by: req.decoded._id
    })

    try {
        const newProduct = await product.save()
        res.status(201).json({newProduct})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

exports.updateProduct = async (req, res) => {
    let { title, category, description, img, price} = req.body
    try {
        if(req.decoded._id != res.product.created_by){
            return res.status(401).send({ message: "Unauthorized"});
        }

        if(title) {
            res.product.title = title
        }
        if(category) {
            res.product.category = category
        }
        if(description) {
            res.product.description = description
        }
        if(img) {
            res.product.img = img
        }
        if(price) {
            res.product.price = price
        }

        const updatedProduct = await res.product.save()
        res.status(201).json(updatedProduct)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

exports.removeProduct = async (req, res) => {
    try {
        if(req.decoded._id != res.product.created_by){
            return res.status(401).send({ message: "Unauthorized"});
        }
        await res.product.remove()
        res.json({message: 'Product deleted'})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}