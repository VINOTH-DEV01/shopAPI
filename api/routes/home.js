const express = require("express");
const router = express.Router();
const Products = require('./models/products');
const mongose = require("mongoose")
const bodyParser = require('body-parser');

// router.use(bodyParser.urlencoded());
// router.use(bodyParser.json());
// router.use(bodyParser.urlencoded({
//     extended: false,
// }));


router.get('/', (req, res, next) => {
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
            error: err
        })
    });
    res.render("home", {
        latestProductsList: 5000000,
        products: "abcdefg"
    });
});
router.post('/', (req, res, next) => {
    const product = new Products({
        _id: new mongose.Schema.Types.ObjectId,
        name: "Coffee",
        price: "12$"
    });
    product.save().then((result) => {
        console.log(result);
        res.status(200).json({
            message: "Handling POST REQUEST TO  / products ",
            getProducts: result
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
    }
    }}).exec().then(result => {
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
