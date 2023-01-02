const Product = require('../models/Product');
const { verifyTokenAndAuthorization, verifyTokenAdmin, verifyToken } = require('./verifyToken');
const CryptoJS = require('crypto-js')

const router = require('express').Router();


// CREATE 

router.post("/" , verifyTokenAdmin ,  async(req , res) => {
    const newProduct = new Product(req.body);

    try{
        const saveProduct = await newProduct.save();
        res.status(200).json(saveProduct)
    }

    catch(err){
        res.status(500).json(err)
    }
})

// UPDATED Product METHOD

router.put("/:id", verifyTokenAdmin, async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            },
            { new: true }
        );
        res.status(200).json(updatedProduct)
    }
    catch (err) {
        res.status(500).json(err)
    }
})


// DELETED product METHOD

router.delete("/:id",verifyTokenAdmin , async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json("Product has been deleted")
    }
    catch (err) {
        res.status(500).json(err)
    }
});

// GET PRODUCT METHOD

router.get("/find/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        res.status(200).json(product)
    }
    catch (err) {
        res.status(500).json(err)
    }
});

// GET all users method

router.get("/",  async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try {
        let products;
       if(qNew){
        products = await Product.find().sort({createdAt : -1}).limit(5)
       } else if(qCategory){
        products = await Product.find({
            categories : {
                $in : [qCategory]
            }
        })
       }else {
        products = await Product.find()
       }
       res.status(200).json(products)
    }
    catch (err) {
        res.status(500).json(err)
    }
});


  
module.exports = router;