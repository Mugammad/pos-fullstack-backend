//CART FUNCTIONS
const jwt = require("jsonwebtoken");
const Product = require('../models/product')

exports.getCartItems = async (req, res) => {
    res.send(req.decoded.cart)
}

exports.addCartItem = async (req, res) => {
    let addedProduct = await Product.findById(req.params.id).lean()

    let cart = req.decoded.cart

    console.log(cart);
    console.log(addedProduct);
    let inCart = false
    try {
        if(!addedProduct){
            return res.status(401).send({ message: "No new product"});
        }
        //check if item is in cart
        cart.forEach( item => {
            console.log(item._id.valueOf());
            console.log(addedProduct._id.valueOf());
            if(item._id.valueOf() == addedProduct._id.valueOf()){
                inCart = true
                item.qty += req.body.qty
                res.user.cart = cart
            }
        });
        if(!inCart){
            cart.push({...addedProduct, qty: req.body.qty})
            res.user.cart = cart
        }

        const updatedUser = await res.user.save()

        let newUser = {
            _id: res.user._id,
            fullname: res.user.fullname,
            email: res.user.email,
            phone_number: res.user.phone_number,
            cart: res.user.cart
        }

        let token = jwt.sign( newUser, process.env.SECRET, {
            expiresIn: 86400 // 24 hours
        });
        
        console.log(cart)
        console.log(res.user.cart);
        res.status(201).json({updatedUser, accessToken: token})
    } catch (error) {
        res.status(500).json({message: error.message})
    }

}

exports.delCartItems = async (req, res) => {
    try {
        res.user.cart = []

        let newUser = {
            _id: res.user._id,
            fullname: res.user.fullname,
            email: res.user.email,
            phone_number: res.user.phone_number,
            cart: res.user.cart
        }

        let token = jwt.sign( newUser, process.env.SECRET, {
            expiresIn: 86400 // 24 hours
        });

        await res.user.save()

        res.json({message: 'Cart emptied', accessToken: token})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}

exports.delCartItem = async (req, res) => {
    let cart = req.decoded.cart
    cart.forEach((item) =>{
        console.log(item._id);
        console.log(req.params.id);
        if(item._id == req.params.id){
            cart = cart.filter(cartItem => cartItem._id != req.params.id)
        }
    })
    try {

        res.user.cart = cart

        let newUser = {
            _id: res.user._id,
            fullname: res.user.fullname,
            email: res.user.email,
            phone_number: res.user.phone_number,
            cart: res.user.cart
        }

        let token = jwt.sign( newUser, process.env.SECRET, {
            expiresIn: 86400 // 24 hours
        });

        const updatedCart = await res.user.save()

        res.json({message: 'Cart item removed', updatedCart, accessToken: token})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}

exports.changeQty = async (req, res) => {
    let product = await Product.findById(req.params.id).lean()
    let cart = req.decoded.cart

    try {
        cart.forEach( item => {
            if(item._id.valueOf() == product._id.valueOf()){
                item.qty = req.body.qty
                res.user.cart = cart
            }
        });

        const updatedUser = await res.user.save()

        let newUser = {
            _id: res.user._id,
            fullname: res.user.fullname,
            email: res.user.email,
            phone_number: res.user.phone_number,
            cart: res.user.cart
        }

        let token = jwt.sign( newUser, process.env.SECRET, {
            expiresIn: 86400 // 24 hours
        });

        res.status(201).json({updatedUser, accessToken: token})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}