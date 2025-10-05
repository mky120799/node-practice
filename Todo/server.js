require('dotenv').config()
const{ connectDB }= require("./db/db");
const express = require('express')
const app = express()

//middelwares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))






connectDB();//DB connection
const PORT=process.env.PORT;
app.listen(PORT,()=>{
    console.log(`app is listening at port ${PORT}`)
})