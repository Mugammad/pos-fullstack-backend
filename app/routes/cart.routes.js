const express = require('express')
const router = express.Router()
const controller = require('../controllers/cart.controller')
const getUser = require('../middleware/users')
const verifyToken = require('../middleware/authJwt')

//CART ROUTES

//get cart items
router.get('/', [verifyToken, getUser], controller.getCartItems)

//post new cart
router.post('/:id', [verifyToken, getUser], controller.addCartItem)

//delete cart items
router.delete('/', [verifyToken, getUser], controller.delCartItems)

//remove one item from cart
router.patch('/:id', [verifyToken, getUser], controller.delCartItem)

//change qty
router.put('/:id', [verifyToken, getUser], controller.changeQty)

module.exports = router