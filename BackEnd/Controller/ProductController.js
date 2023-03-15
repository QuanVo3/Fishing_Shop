const { json } = require("body-parser");
const { ProductModel, SaleModel, BannerModel } = require("../Model/Index");

const productController = {
  // GET REQUESTS
  getAllProduct: async (req, res) => {
    try {
      const getProduct = await ProductModel.find();
      res.status(200).json();
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  findProduct: async (req, res) => {
    try {  
    // FIND PRODUCTS THAT CONTAIN A STRING IN ITS NAME,TYPE OR MANUFACTURER  
    const searchString = req.query.searchString
    const getProduct = await ProductModel.find({
      $or: [
        { name: { $regex: searchString, $options: 'i' } },
        { type: { $regex: searchString, $options: 'i' } },
        { manufacturer: { $regex: searchString, $options: 'i' } } 
      ]
    })
      console.log(req.query.name);
      console.log(getProduct)
      res.status(200).json(getProduct);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  getSaleProduct: async (req, res) => {
    try {
      const getProduct = await SaleModel.find().populate("_id");
      res.status(200).json(getProduct);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  //POST REQUESTS
  addProduct: async (req, res) => {
    try {
      const newProduct = new ProductModel(req.body);
      const addProduct = await newProduct.save();
      console.log(newProduct);
      res.status(200).json(addProduct);
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  },
  addBanner: async (req, res) => {
    try {
      const newBanner = new BannerModel(req.body);
      const addBanner = await newProduct.save();
      console.log(newBanner);
      res.status(200).json(addBanner);
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  },

  // DELETE REQUESTS
  deleteProduct: async (req, res) => {
    const isExist = await ProductModel.findById(req.body._id);
    if (isExist != null) {
      try {
        const deleteProduct = await AccountModel.deleteOne({
          _id: isExist._id,
        });
        res.status(200).json("Deleted");
      } catch (error) {
        res.status(500).json(error);
      }
    }
    res.status(500).json("Product is not exist");
  },

  //PUT REQUESTS
  updateProduct: async (req, res) => {
    try {
      const updateProduct = await ProductModel.findByIdAndUpdate(
        req.body._id,
        req.body,
        { new: true }
      );
      console.log(req.body._id);
      res.status(200).json("Succeed!");
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
module.exports = productController;
