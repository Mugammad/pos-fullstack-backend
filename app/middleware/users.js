//MUGAMMAD BREDA WROTE THIS CODE....WELL....MOST OF IT

const User = require('../models/user')

getUser = async (req, res, next) => {
    console.log(req.decoded)
    let user
    try {
        user = await User.findById(req.decoded._id)
        if(!user) {
            return res.status(404).json({message: 'Cannot find user'})
        }
    } catch (error) {
        return res.status(500).json({message: error.message})
    }

    res.user = user
    next()
}

module.exports = getUser