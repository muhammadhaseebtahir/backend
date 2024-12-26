const express = require("express")
const serverLess= require("serverless-http")
const bodyParser = require("body-parser")
const app = express()
const dbConnected= require("./src/config/db")
const cors = require("cors")
const auth = require("./src/routes/Auth")
app.use(cors())
app.use(bodyParser.json())
require("dotenv").config();
dbConnected()
app.get("/",(req,res)=>{
    res.send("hello")
})
const {PORT=8000} = process.env
app.listen(PORT,()=>{
    console.log(`Server is Runing ${PORT}`);
    
})
app.use("/auth",auth)
export const handler =serverLess(app)

