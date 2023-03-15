const mongoose = require("mongoose");

const Schema = mongoose.Schema();

//Product schema
const Product = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  model: { type: [String] },
  manufacturer: { type: String, required: true },
  description: { type: String },
  price: { type: String, required: true },
  quantity: { type: Number, required: true },
  images: [{ type: String }],
});

const Sale = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: mongoose.Types.ObjectId,
    ref: "product",
  },
})

const Banner = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
    default: function () {
      return new Date().getTime(); // generate a unique value based on current timestamp
    },
    immutable: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

//Account schema
const Account = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: mongoose.Types.ObjectId,
    ref: "userprofile",
  },
  userName: { type: String, required: true, unique: true },
  passWord: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
});

//User profile schema
const UserProfile = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, ref: "Account", required: true },
  FirstName: {
    type: String,
  },
  LastName: {
    type: String,
  },
  Email: {
    type: String,
  },
  Phone: {
    type: String,
    required: true,
  },
  Address: {
    type: String,
  },
});

let ProductModel = mongoose.model("product", Product,"products");
let SaleModel = mongoose.model("sale",Sale)
let AccountModel = mongoose.model("account", Account);
let UserProfileModel = mongoose.model("userprofile", UserProfile);
let BannerModel = mongoose.model("banner",Banner);


//EXPORT
module.exports = { ProductModel, AccountModel, UserProfileModel,SaleModel, BannerModel};
