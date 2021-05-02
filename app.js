const express = require("express");
const app = express();
const mongodb = require('mongodb');

// const morgan = require('morgan');


//  Body parser  req getting  // 
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

app.use(express.static("public"));
app.set("view engine", "ejs");

const cartRoute = require('./api/routes/cart');
const singleProduct = require('./api/routes/single-product');
const shopRoute = require('./api/routes/shop');
const homeRoute = require('./api/routes/home');


app.use('/cart', cartRoute);
app.use('/single-product', singleProduct);
app.use('/shop', shopRoute);
app.use('/', homeRoute);
// app.get('/', logStuff, function (req, res, next) {
//   res.send('User Info')
// })



module.exports = app;

