const express = require("express");
const router = express.Router();
const Products = require('./models/products');
const mongose = require("mongoose")


router.get('/', (req, res, next) => {
    const products = {
        name: req.body.name,
        value: req.body.value
    }
    Products.find().exec().then(doc => {
        if (doc.leength >= 0) {
            res.status(200).json({
                message: "Handling GET REQUEST TO  / productId ",
                getProducts: doc
            });
        }
        else {
            res.status(404).json({
                message: "404 Not Found",
            });
        }
    }).catch((error) => {
        console.log(error);
        res.status(500).json({
            error: error,
        });
    });
    res.status(200).json({
        message: " Handling GET request to /",
        createProduct: products
    });
    /*res.render("home", {
        latestProductsList: 5000000,
        products: "abcdefg"
    });*/
});
router.post('/', (req, res, next) => {
    const product = new Products({
        _id: new mongose.Schema.Types.ObjectId,
        name: req.body.name,
        price: req.body.price
    });
    product.save().then((result) => {
        console.log(result);
        res.status(200).json({
            message: "New prioduct is successfully created!",
            createdProduct: {
                name: result.name,
                price: result.price
            }
        });
    }).catch((error) => {
        console.log(error);
        res.status(500).json({
            error: err
        })
    });
    /*res.render("home", {
        latestProductsList: 5000000,
        products: "abcdefg"
    });*/
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
