const express = require("express")
const app = express();
const mongoose = require('mongoose')
const dotenv = require('dotenv');
dotenv.config();
const cors = require("cors")
//  api route
const userRouter = require('./routes/user');
const authRouter = require('./routes/auth')
const productRouter = require('./routes/product')
const cartRouter = require('./routes/cart')
const orderRouter = require('./routes/order');
const stripeRouter = require("./routes/stripe")

//  server port
const port = process.env.PORT || 5000;

// mongo connection

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('DB connection successfully'))
    .catch((err) => {
        console.log(err);
    });
app.use(express.json());

app.use(cors())
app.use("/api/auth", authRouter)
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/api/orders', orderRouter);
app.use('/api/checkout' , stripeRouter)

app.listen(port, () => {
    console.log('backend server is running');
})