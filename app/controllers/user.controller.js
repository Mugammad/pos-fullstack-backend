//MUGAMMAD BREDA WROTE THIS CODE....WELL....MOST OF IT

const User = require('../models/user')

exports.getAll = async (req, res) =>{
    try {
        const users = await User.find()
        res.status(200).json({users})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

exports.getOne = (req, res) => {
    res.send(res.user.fullname)
}

exports.updateUser = async (req, res) => {
    let { fullname, email, phone_number} = req.body
    
    try {
        if(req.params.id != res.user._id){
            return res.status(401).send({ message: "Unauthorized"});
        }

        if(fullname) {
            res.user.fullname = fullname
        }
        if(email) {
            res.user.email = email
        }
        if(phone_number) {
            res.user.phone_number = phone_number
        }
    
        const updatedUser = await res.user.save()
        res.status(201).json(updatedUser)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

exports.deleteUser = async (req, res) => {
    try {
        if(req.params.id != res.user._id){
            return res.status(401).send({ message: "Unauthorized"});
        }
        await res.user.remove()
        res.json({message: 'Account removed'})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}