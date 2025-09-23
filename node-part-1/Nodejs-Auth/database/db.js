const { default: mongoose } = require("mongoose")
const dotenv = require('dotenv')
dotenv.config()

console.log(process.env.MONGO_URI)
module.exports = connectToDB = async() =>{
    try{
        await mongoose.connect(process.env.MONGO_URI,{
         dbName:'AuthTest'
        });
        console.log("✨mongodb connected");

    }
    catch(e){
        console.error("MongoDB connection failed");
        process.exit(1)
    }
}


