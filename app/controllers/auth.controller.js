const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
    try {
        let { fullname, email, password, phone_number } = req.body
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)
        const user = new User({
            fullname,
            email,
            password: hashedPassword,
            phone_number
        })
        const newUser = await user.save()
        res.status(201).json(newUser)
    } catch (err){
        res.status(500).json({message: err.message})
    }
}

exports.signin = async (req, res) =>{
    try {
        User.findOne({ fullname : req.body.fullname }, (err, person) => {
            if (err) return handleError(err);
            
            if (!person) {
                return res.status(404).send({ message: "User Not found." });
            }

            let passwordIsValid = bcrypt.compareSync( req.body.password, person.password);

            if (!passwordIsValid) {
                return res.status(401).send({
                  accessToken: null,
                  message: "Invalid Password!"
                });
            }
            var token = jwt.sign({ id: person.id }, process.env.SECRET, {
                expiresIn: 86400 // 24 hours
            });
            res.status(200).send({
                id: person.id,
                fullname: person.fullname,
                email: person.email,
                accessToken: token
            });
        });
        
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}