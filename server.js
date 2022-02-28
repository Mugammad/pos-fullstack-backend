require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL , { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

const productsRouter = require('./app/routes/product.routes')
const usersRouter = require('./app/routes/user.routes')
const authRouter = require('./app/routes/auth.routes')
const cartRouter = require('./app/routes/cart.routes')
app.use('/products', productsRouter)
app.use('/users', usersRouter)
app.use('/cart', cartRouter)
app.use('/auth', authRouter)

app.get('/', (req, res) => {
    res.status(200).json({message: "We sell hoodies"})
})

app.listen(process.env.PORT || 3000, () => console.log(`Server started on port 3000`))