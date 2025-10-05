const mongoose = require('mongoose')
const url=process.env.MONGO_URI
async function connectDB(){
    await mongoose.connect(url,{
    dbName:"Todo"
   })
}

mongoose.connection.on('connected',()=>console.log("connected to DB"))
mongoose.connection.on("disconnected", () => console.log("disconnected to DB"));


module.exports = { connectDB };