const mongoose = require("mongoose");
const Products = require('./../../api/routes/models/products');

exports.getHome = (req, res) => {
    Products.find().select().then((result) => {
        res.render("home");
        // res.status(200).json({
        //     message: "Your List of products",
        //     data: result
        // });
        next();
    }).catch((err) => {
        res.status(404).json({
            message: "product id  is not available",
            erro: err
        });
    });
}

// Post controller // 

exports.postData = (req, res, next) => {
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
}

exports.deleteData = (req, res, next) => {
    const _id = req.params.productId;
    Products.remove({ _id: _id }).exec().then(result => {
        res.status(201).json({
            message: "This product is deleted successfully! " + _id,
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
}


