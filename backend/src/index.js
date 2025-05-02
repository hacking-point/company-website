const express=require("express")
const app=express()
const admin=express()
const User=require("./routes/user")
const Product=require("./routes/product")
const  server=require("http").createServer(app)
const session=require("express-session")
const cors=require("cors")
app.use(express.json())
app.use(cors())
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))

app.use("/auth",User)
app.use("/product",Product)
app.use("/admin",admin)

app.get("/",(req,res)=>{
    res.send(`worker is running ${process.pid}`)
})
admin.get("/", (req, res) => {
    res.send("Welcome to the Admin Panel!");
});




module.exports=server