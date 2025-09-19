const express = require('express')
const connectToDB  = require('./database/db')
const app = express();
const bookRoutes = require('./routes/book-routes')
const dotenv = require('dotenv')
 dotenv.config()
const PORT = process.env.PORT
//middlewares

app.use(express.json())
app.use(express.urlencoded({extended:true}))


// router here
app.use('/api/books',bookRoutes)



// connection with database
connectToDB();
app.listen(PORT,()=>{
    console.log(`app is listening at port  ${PORT}`)
})



