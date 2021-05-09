const express = require("express");
const router = express.Router();
const Products = require('./models/products');


const mongoose = require("mongoose");
// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://<username>:user@cluster0.40rwr.mongodb.net/abc?retryWrites=true&w=majority";
// // Set up the connection to the local db
// var mongoclient = new MongoClient(uri, {native_parser: true});

// mongoose.connect("mongodb+srv://user:user@cluster0.40rwr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
// { useNewUrlParser: true, useUnifiedTopology: true });


mongoose.connect("mongodb+srv://shopapi:shopapi@cluster0.hajuq.mongodb.net/ProductDb?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true });

// Open the connection to the server
router.get('/', (req, res) => {
    Products.find().select('name price').then((result) => {
        // Products.find().select("price").then((result) => {   select() mspaecifi properties means column i cont able to get it  why from mongoDB ?? 
        res.status(200).json({
            message: "Your List of products",
            data: result
        });
        // res.render("home", {
        //     posts: {
        //         id:"123123123"
        //     }
        // });
        next();
    }).catch((err) => {
        res.status(404).json({
            message: "product id  is not available",
            erro: err
        });
    });
});
router.get('/products', (req, res, next) => {
    Products.find().select("price").then((result) => {
        // Products.find().select("price").then((result) => {   select() mspaecifi properties means column i cont able to get it  why from mongoDB ?? 
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
router.post('/demo', (req, res, next) => {
    const product = new Products({
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        price: req.body.price
    });
    product.save().then((result) => {
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
router.delete('/deleteProduct/:productId', (req, res, next) => {
    const _id = req.params.productId;
    Products.remove({ _id: _id }).exec().then(result => {
        res.status(201).json({
            message: "This product is deleted successfully!" + _id,
            deletedProduct: result
        });
        next();
    }).catch((error) => {
        console.log(error);
        res.status(500).json({
            message: "this product is not existed",
            error: err
        })
    });
});












module.exports = router;
