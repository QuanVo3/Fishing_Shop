const { json } = require("express");
const { AccountModel, UserProfileModel } = require("../Model/Index");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const dotEnv = require("dotenv");
dotEnv.config({ path: "./Config/.env" })
const accountController = {
  //CONTROLLER FOR ADMIN

  getAllUser: async (req, res) => {
    try {
      // USE THE `FIND` METHOD OF THE `ACCOUNTMODEL` TO RETRIEVE ALL DOCUMENTS FROM THE COLLECTION
      // THE `POPULATE` METHOD IS USED TO INCLUDE THE DATA FROM THE REFERENCED COLLECTION

      const getUser = await AccountModel.find().populate("_id");
      res.status(200).json(getUser);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  createUser: async (req, res) => {
    try {
      //CHECK IF REQ HAVE REQUIRED FIELDS
      if (!req.body.userName || !req.body.passWord || !req.body.Phone) {
        return res.status(400).json({ message: "Please provide all required fields!" });
      }

      //ENCRYPT PASSWORD
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(req.body.passWord, saltRounds);

      // CREATE A NEW USER ACCOUNT
      const newUser = await new AccountModel({
        userName: req.body.userName,
        passWord: hashedPassword,
      }).save();

      // USE THE _ID THAT RETURNED BY NEWUSER AND CREATE A USERPROFILE THAT CONTAIN PHONE NUMBER

      const createProfile = await UserProfileModel({
        _id: newUser._id,
        Phone: req.body.Phone,
      }).save();

      // SEND A JSON RESPONSE WITH THE CREATED USER OBJECT

      res.status(200).json(newUser);
    } catch (err) {
      if (err.name === "ValidationError") {
        res.status(400).json({ message: err.message });
      } else {
        res.status(500).json({ message: err.message });
      }
    }
  },

  deleteUser: async (req, res) => {
    const isExist = await AccountModel.findById(req.body._id);
    if (isExist != null) {
      try {
        const deleteUser = await AccountModel.deleteOne({ _id: isExist._id });
        res.status(200).json("Deleted");
      } catch (error) {
        res.status(500).json(error);
      }
    }
    res.status(500).json("User is not exist");
  },

  //THIS CONTROLLER CAN BE USED BY BOTH ADMIN AND USER
  updateUser: async (req, res) => {
    try {
      const updateUser = await AccountModel.findByIdAndUpdate(
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
  getUserById: async (req, res) => {
    try {
      const getUser = await AccountModel.findById(req.body._id);
      res.status(200).json(getUser);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  //CONTROLLER FOR USER
  updateUserProfile: async (req, res) => {
    try {
      const updateUserProfile = await new UserProfileModel(req.body).save();
      console.log(this.updateUser);
      res.status(200).json(updateUserProfile);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  login: async (req, res) => {
    try {
      const user = await AccountModel.findOne({ userName: req.body.userName });

      if (!user) {
        return res.status(400).json({ message: "Invalid UserName or password" });
      }
      const isMatch = await bcrypt.compare(req.body.passWord, user.passWord);

      if (!isMatch) {
        return res.status(400).json({ message: "Invalid email or password" });
      }
      else
      {
       const token = jwt.sign({
          _id : user._id,
          isAdmin: user.isAdmin
        }, process.env.ACCESS_TOKEN_SECRET,{expiresIn: "30m"})

        // RETURN AN OBJECT WITHOUT PASSWORD
        const {passWord,...other} = user._doc;
        res.status(200).json({...other,token});
      }

      
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  },
};

module.exports = accountController;
