const mongoose = require('mongoose')


const connectToDB = async() =>{
      try{
         await mongoose.connect("mongodb://127.0.0.1:27017/BookStoreDB");
         console.log(`mongodb connected`)
      }catch(error){
         console.error(`Mongodb connetion failed`,error)
         process.exit(1)
      }
}


module.exports = connectToDB;