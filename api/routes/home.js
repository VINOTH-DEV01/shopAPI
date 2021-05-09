const express = require("express");
const router = express.Router();
const homeController = require('../controllers/home');


const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://shopapi:shopapi@cluster0.hajuq.mongodb.net/ProductDb?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true });

// Open the connection to the server
router.get('/', homeController.getHome);
router.get('/products',homeController.getHome);
router.post('/addnewproduct', homeController.postData);
router.delete('/deleteProduct/:productId', homeController.deleteData);
module.exports = router;
