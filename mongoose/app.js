const express = require("express");
const app = express();
app.use(express.json());

const mongoose = require("mongoose");
const url = "mongodb://127.0.0.1:27017/sangam_mukharjee";

mongoose
  .connect(url)
  .then(() => {
    console.log("mongodb connected successfully");
  })
  .catch((err) => {
    console.error("error in mongodb connection:", err);
  });

// create model
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  tags: [String], // fixed: array of strings
  isActive: Boolean,
  createdAt: { type: Date, default: Date.now },
});
const User = mongoose.model("User", userSchema);

// Example query
async function runQueryExample() {
  try {
    const newUser = new User({
      name: "Kritika",
      email: "Kritika12@dfhk.com",
      isActive: false,
      tags: ["developer", "designer", "painter"],
    });
     getUserOfActiveFalse = await User.find({isActive:false})
    console.log(getUserOfActiveFalse)
    return getUserOfActiveFalse;
    
    // const savedUser = await newUser.save(); // ✅ ensure save completes
    // console.log("user saved successfully:", savedUser);
    // return savedUser;
  } catch (e) {
    console.error("error -->", e);
  }
}

// function  getUserOfActiveFalse(){ 
//     const get = await User.find({isActive: false})
// }


app.get("/", async (req, res) => {
  const user = await runQueryExample();
  res.send(user); // send response to client
});
 

const PORT = 1111;
app.listen(PORT, () => {
  console.log(`listening at port ${PORT}`);
});
