//MUGAMMAD BREDA WROTE THIS CODE....WELL....MOST OF IT

const express = require('express')
const router = express.Router()
const controller = require('../controllers/user.controller')
const getUser = require('../middleware/users')
const verifyToken = require('../middleware/authJwt')

//USER ROUTES

//get all users
router.get('/', controller.getAll)

// get specific user
router.get('/:id', [verifyToken, getUser], controller.getOne)

//update specific user info
router.patch('/:id', [verifyToken, getUser] ,controller.updateUser)

//delete specific user
router.delete('/:id', [verifyToken, getUser] ,controller.deleteUser)

module.exports = router