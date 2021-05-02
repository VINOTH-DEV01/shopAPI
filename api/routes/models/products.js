const Mongoose = require("mongoose");

const productSchema = Mongoose.Schema({
  _id: Mongoose.Types.ObjectId,
  name: String,
  price: Number
});
module.exports = Mongoose.model('Product', productSchema)