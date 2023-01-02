const User = require('../models/User');
const { verifyTokenAndAuthorization, verifyTokenAdmin } = require('./verifyToken');
const CryptoJS = require('crypto-js')

const router = require('express').Router();


// UPDATED METHOD
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString();
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            },
            { new: true }
        );
        res.status(200).json(updatedUser)
    }
    catch (err) {
        res.status(500).json(err)
    }
})


// DELETED METHOD

router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try{
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User has been deleted")
    }
    catch(err){
        res.status(500).json(err)
    }
});

// GET METHOD

router.get("/find/:id", verifyTokenAdmin, async (req, res) => {
    try{
       const user = await User.findById(req.params.id)
        const {password , ...others} = user._doc;
        res.status(200).json(others)
    }
    catch(err){
        res.status(500).json(err)
    }
});

// GET all users method

router.get("/", verifyTokenAdmin, async (req, res) => {
    try{
       const users = await User.find()
        
        res.status(200).json(users)
    }
    catch(err){
        res.status(500).json(err)
    }
});

module.exports = router;