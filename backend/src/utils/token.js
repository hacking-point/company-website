const jwt=require("jsonwebtoken")
require("dotenv").config()
const newToken=(user)=>{
    return jwt.sign({user:user,exp:Date.now()+1000*60*60*24},process.env.PRIVATE_KEY)
}

const verifyaToken=(token)=>{
    return new Promise((resolve,reject)=>{
        jwt.verify(token,process.env.PRIVATE_KEY,(err,decoded)=>{
            if(err){
                reject(err)
            }
            else{
                resolve(decoded)
            }
        })
    })
}
module.exports={newToken,verifyaToken}