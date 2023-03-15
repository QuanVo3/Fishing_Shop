const router = require('express').Router();
const productController = require('../Controller/ProductController')
const userController =require('../Controller/AccountController');
const { UserProfileModel } = require('../Model/Index');
const middleware = require('../Controller/Middleware');
//PRODUCTS ROUTES
//GET REQS
router.get("/getAllProducts", productController.getAllProduct);
router.get("/findProducts",productController.findProduct)
router.get("/Sale",productController.getSaleProduct)

//POST REQS
router.post("/addProducts",productController.addProduct);
router.post("/addBanner", productController.addBanner);

//PUT REQS
router.put("/updateProduct",productController.updateProduct);

//DELETE REQS
router.delete("/deleteProducts",productController.deleteProduct);




//ADMIN ROUTES
router.get("/getAllUser",middleware.accessTokenAdmin,userController.getAllUser)
router.post("/addUser",middleware.accessTokenAdmin,userController.createUser);
router.delete("/deleteUser",middleware.accessTokenAdmin,userController.deleteUser);
router.put("/updateUser",middleware.accessTokenAdmin,userController.updateUser);

//USER ROUTE
router.get("/getUserById",userController.getUserById);
router.put("/updateUserProfile",userController.updateUserProfile)
router.post("/login", userController.login)

//EXPORT ROUTER
module.exports = router;