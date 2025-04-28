const formatOfError=(error,res)=>{
    console.log(error)
    if(error.name==="ValidationError"){
        const messages=Object.values(error.errors).map(err=>err.message)
        return res.status(400).json({message:messages.join(", ")})
    }
    return res.status(500).send({message:"An unexpected error occured"})
}
module.exports={formatOfError}