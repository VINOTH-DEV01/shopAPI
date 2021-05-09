const express = require("express");
const router = express.Router();
const Shop = require('./models/shop');


const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://shopapi:shopapi@cluster0.hajuq.mongodb.net/ProductDb?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true });



// Open the connection to the server
router.get('/', (req, res) => {
    Shop.find().select().then((result) => {
        res.render("shop", {
            productList:result
        });
        console.log("result", result);
        res.status(200).json({
            message: "Your List of products",
            data: result
        });
        next();
    }).catch((err) => {
        res.status(404).json({
            message: "product id  is not available",
            erro: err
        });
    });
});


router.post('/addnewproduct', (req, res, next) => {
    const shop = new Shop({
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        price: req.body.price
    });
    shop.save().then((result) => {
        console.log("result", result);
        res.status(201).json({
            message: "your product is created succefully",
            data: result
        });
    }).catch((err) => {
        res.status(400).json({
            message: "product is not created",
            errro: err
        });
    });
});





module.exports = router;
