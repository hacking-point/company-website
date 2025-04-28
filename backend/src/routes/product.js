const express=require("express")
const router=express.Router()
const {uploadMultiple,uploadSingle}=require("..//middleware/upload")
const {AddProduct,GetProduct,SingleProduct,UpdateProduct,DeleteProduct}=require("..//controllers/product")
const Authentication=require("..//middleware/authentication")
const Authorization=require("..//middleware/authorization")

router.post("/addProduct",Authentication,Authorization(),uploadMultiple("imageUrl",2),AddProduct)
router.get("/getProduct",Authentication,Authorization(),GetProduct)
router.get("/singleProduct/:id",Authentication,Authorization(),SingleProduct)
router.put("/updateProduct/:id",Authentication,Authorization(),UpdateProduct)
router.patch("/updateProduct/:id",Authentication,Authorization(),UpdateProduct)
router.delete("/deleteProduct/:id",Authentication,Authorization(),DeleteProduct)




module.exports=router