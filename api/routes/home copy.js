const express = require("express");
const router = express.Router();
const Products = require('./models/products');


const Mongoose = require("mongoose");
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb://localhost:27017/myfirstDb";





// router.get('/:productId', (req, res, next) => {
//     const id = req.params.id;
//      Products.findById(id).exec().then((result) => {
//          console.log("result", result);
//          res.status(200).json({
//              message:"your discovered the Id",
//              data:result
//          });
//      }).catch(err => err);
 
//  });


router.post('/', (req, res, next) => {
    /*const product = new Products({
        _id: new Mongoose.Types.ObjectId,
        name: req.body.name,
        price: req.body.price
    });
    res.status(201).json({
        message: "New prioduct is successfully created!",
        createdProduct: product
    }); *uccess case only mongoDB data passing  */


    const product = new Products({
        _id: new Mongoose.Types.ObjectId,
        name: req.body.name,
        price: req.body.price
    });
    console.log(product);
    MongoClient.connect(uri, (err, db) => {
        if (err) {
            console.log("mongoDb connection is failed!");
        };
        db.collection("productList").insertOne(productSchema, (err, res) => {
            if (err) {
                console.log("Document create is failed!");
                return err;
            };
            console.log("Document inserted!");
            db.close();
        });
    });
    product.save().then((result) => {
        console.log(result);
        res.status(201).json({
            message: "New prioduct is successfully created!",
            createdProduct: {
                name: result.name,
                price: result.price
            }
        });
    }).catch((error) => {
        console.log(error);
        res.status(500).json({
            error: error
        })
    });


});
router.patch('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Products.update({ _id: id }, {
        $set: {
            name: req.body.newName,
            price: req.body.newPrice
        }
    }).exec().then(result => {
        res.status(200).json(result);
    }).catch(err => {
        res.status(500).json({
            error: err
        });
    });

});
router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Products.findById(id).exec().then(doc => {
        if (doc) {
            res.status(200).json({
                message: "Handling GET REQUEST TO  / productId ",
                getProducts: doc
            });
        }
        else {
            res.status(400).json({
                message: "no valide entry found for the provide  Id",
            });
        }
    }).catch((error) => {
        console.log(error);
        res.status(500).json({
            error: err
        })
    });
    /*
     res.render("home", {
         latestProductsList: 5000000,
         products: "abcdefg"
     }); */
});


router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Products.remove({ _id: id }).exec().then(result => {
        res.status(200).json({
            message: "Handling delete REQUEST TO  /productId  ",
            deletedProduct: result
        });
    }).catch((error) => {
        console.log(error);
        res.status(500).json({
            error: err
        })
    });
    /*
    res.render("home", {
        latestProductsList: 5000000,
        products: "abcdefg"
    }); */
});
module.exports = router;
