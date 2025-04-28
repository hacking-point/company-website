const {verifyaToken}=require("..//utils/token")
const {formatOfError}=require("..//utils/valdation")


module.exports=async (req,res,next)=>{
    try{
        if(!req.headers?.authorization) return res.status(400).send({email:"Please Provide authorization token"})
        const bearerToken=req?.headers?.authorization
    if(!bearerToken.startsWith("Bearer")) return res.status(400).send("please provide bearer token")
        const token=bearerToken.split(" ")[1]
    let user=await verifyaToken(token)
    req.user=user.user
    console.log(req.user)
    next()

    }
    catch(err){
        formatOfError(err,res)

    }
}