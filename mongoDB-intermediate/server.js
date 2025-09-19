require('dotenv').config()
const productRoutes = require('./routes/product-routes')
const bookRoutes = require('./routes/books-routes')
const express = require("express")
const app = express()
const mongoose = require('mongoose')

// middlewares

app.use(express.json())

app.use('/products',productRoutes);
app.use('/reference',bookRoutes)







console.log(process.env.MONGO_URI)

mongoose.connect(process.env.MONGO_URI,{
    dbName: 'SangamMukharjee'
})
.then(()=> console.log('mongodb connected successfully'))
.catch((e)=> console.log(e));
 


app.listen(process.env.PORT,()=>{
    console.log(`server is now running on port ${process.env.PORT}`)
})  