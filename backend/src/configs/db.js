const mongoose=require("mongoose")
require("dotenv").config()
const MONGO_HOST=process.env.MONGO_HOST||'localhost'
const MONGO_PORT=process.env.MONGO_PORT||'27017'
const DB=`mongodb://${MONGO_HOST}:${MONGO_PORT}/hacking-point`
// const DB1 = process.env.MONGO_URL || "mongodb://localhost:27017/hacking-point"
module.exports=async ()=>{
    try{
        await mongoose.connect(DB)
        console.log("Database connection successfully")

    }
    catch(err){
        console.log("Database connection unsuccessfully",err)
    }
}