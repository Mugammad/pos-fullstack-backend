//MUGAMMAD BREDA WROTE THIS CODE....WELL....MOST OF IT

const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/authJwt')
const getProduct = require('../middleware/products')
const controller = require('../controllers/product.controller')

//Getting all products
router.get('/',verifyToken, controller.getAll)

//Getting a product
router.get('/:id', [getProduct, verifyToken], controller.getOne)

//Creating a product
router.post('/',verifyToken, controller.createProduct)

//Updating a product
router.patch('/:id', [getProduct, verifyToken], controller.updateProduct)

//Deleting a product
router.delete('/:id', [getProduct, verifyToken], controller.removeProduct)

module.exports = router