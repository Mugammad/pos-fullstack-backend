const express = require('express')
const router = express.Router()
const User = require('../models/user')

//Getting all
router.post('/', async (req, res) => {
    try {
        const user = new User({

        })
        res.json(products)
    } catch (err){
        res.status(500).json({message: err.message})
    }
})

module.exports = router