require('dotenv').config()
const express = require('express')
const connectToDB = require("./database/db");
const authRoutes = require('./routes/auth-routes')
const homeRoutes = require('./routes/home-routes')
const adminRoute = require('./routes/admin-routes')
const uploadImageRoute = require('./routes/image-routes')
const fetchImageRoute= require('./routes/image-routes')

const app = express();

// middlewares

app.use(express.json())
app.use((req,res,next)=>{
    console.log("url->",req.url)
    console.log("param->",req.params)
    console.log("query->", req.query)
     next()
})


// route middleware
app.use("/api/auth", authRoutes);
app.use("/api/home", homeRoutes);
app.use("/api/admin",adminRoute)
app.use("/api/image", uploadImageRoute);
app.use("/api/image",fetchImageRoute)
 
 








const PORT = process.env.PORT || 3000;
connectToDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`⚙️ app is listening at port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("😶‍🌫️ Failed to connect to DB", err);
    process.exit(1);
  });


  // {
//     "success": true,
//     "message": "Logged in successful",
//     "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGNiOGExYjZkZjc2YmI3YTEyNGVhYmUiLCJ1c2VybmFtZSI6IkpvaG4iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NTgxNzEyNTUsImV4cCI6MTc1ODE3MjE1NX0.C5ox9BjMQzHYmJQGTDUJjVd8PfOhOhDb5qRP_WcbbVI"
// }