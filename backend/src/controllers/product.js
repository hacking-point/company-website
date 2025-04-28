const  Product=require("..//models/product")
const {uploadMultiple,uploadSingle}=require("..//middleware/upload")
const {formatOfError}=require("..//utils/valdation")



const AddProduct=async (req,res)=>{
    try{
        if(!req.files || req.files.length===0){
            return res.status(400).json({message:"Please uplaod at least one product"})
        }
          const imageUrl = req.files.map(file => `/upload/${file.filename}`);
         const product=await Product.create({...req.body,imageUrl})
        return res.status(201).json({message:"Product added Successfully",product})
    }
    catch(err){
        return formatOfError(err,res)

    }
}

const GetProduct=async (req,res)=>{
    try{
        const products=await Product.find().lean().exec()
        return res.status(200).send(products)

    }
    catch(err){
        return formatOfError(err,res)
    }
}
const SingleProduct=async (req,res)=>{
    try{
        const {id}=req.params
        const product=await Product.findById(id).lean().exec()
        if(!product){
            return res.status(404).json({message:"Product not Found"})
        }
        return res.status(200).send(product)

    }
    catch(err){
        return formatOfError(err,res)
    }
}
const UpdateProduct=async (req,res)=>{
    try{
        const {id}=req.params
        const product=await Product.findById(id)
        if(!product){
            return res.status(404).json({message:"Product not Found"})
        }

        let updatedData={...req.body}
        if(req.files && req.files.length > 0){
            const imageUrl=req.files.map(file=>`/upload/${file.filename}`)
            updatedData.imageUrl=imageUrl
        }
        const updateProduct=await Product.findByIdAndUpdate(id,updatedData,{new:true,runValidators:true})
        return res.status(200).json({message:"Product updated successfully",product:updateProduct})

    }
    catch(err){
        return formatOfError(err,res)
    }
}
const DeleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Optional: Delete images from server
        if (product.imageUrl && product.imageUrl.length > 0) {
            product.imageUrl.forEach(imgPath => {
                const filePath = path.join(__dirname, "..", imgPath);
                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.error(`Failed to delete image ${imgPath}:`, err.message);
                    }
                });
            });
        }

        // Delete product from database
        await Product.findByIdAndDelete(id);

        return res.status(200).json({ message: "Product deleted successfully" });
    }
    catch (err) {
        return formatOfError(err, res);
    }
};

module.exports={AddProduct,GetProduct,SingleProduct,UpdateProduct,DeleteProduct}