const express = require("express");
const app = express();
const morgan = require('morgan');

app.use(express.static("public"));
app.set("view engine", "ejs"); 

// Mongo DB connection setup // 
const mongodb = require('mongodb');
mongodb.connect("mongodb+srv://user:"+ process.env.MONGOS_ATLAS_PW + "@cluster0.mavgt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
  useMongoClient: true
});

const cartRoute = require('./api/routes/cart');
const singleProduct = require('./api/routes/single-product');
const shopRoute = require('./api/routes/shop');
const homeRoute = require('./api/routes/home');

// function logOriginalUrl (req, res, next) {
//   console.log('Request URL:')
//   next()
// }

// function logMethod (req, res, next) {
//   console.log('Request Type:')
//   // next();
// }

// var logStuff = [logOriginalUrl, logMethod]

// const mongoose = require('mongoose');
// mongoose.connect('mongodb+srv://shopapi:shopapi@cluster0.hajuq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');


// const MongoClient = require('mongoose').MongoClient;
// const uri = "mongodb+srv://shopapi:shopapi@cluster0.hajuq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

/*
app.use((req,res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Autherization')
  if(req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Origin','PUT,POST, PATCH, DELETE, GET')
      return res.status(200).json();
  }
  next();
}); */
app.use('/cart', cartRoute);
app.use('/single-product', singleProduct);
app.use('/shop', shopRoute);                                                                                                                                        
app.use('/', homeRoute);
// app.get('/', logStuff, function (req, res, next) {
//   res.send('User Info')
// })



module.exports = app;

