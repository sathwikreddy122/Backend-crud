const mongoos = require("mongoose");

const ProductSchema = mongoos.Schema(
  {
    name: {
      type: String,
      require: [true, "Please enter a product"],
    },
    quantity: {
      type: Number,
      require: true,
      default: 0,
    },
    price: {
      type: Number,
      require: true,
    },
    image: {
      type: String,
      require: false,
    },
  },
  {
    Timestamp: true,
  }
);

const Product = mongoos.model('Product', ProductSchema);

module.exports = Product;