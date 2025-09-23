// register controller
const User = require('../model/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
exports.registerUser = async(req,res)=>{
    try {
        //register user information from our requuest body
        const { username, email, password, role } = req.body;
        
        // check if the user is alread exists in our database

        const checkExistingUser = await User.findOne({$or :[{username},{email}]})

        if(checkExistingUser){
          return res.status(400).json({
            success:false,
            message:"user is already exists either with same username of same email "
          })
        }
       // hash user password
       const salt = await bcrypt.genSalt(10);
       const hashedPassword = await bcrypt.hash(password,salt);

       //create a new user and same in your database
       const newlyCreatedUser = new User({
        username,email,password : hashedPassword, role: role ?? 'user'
       })
       await newlyCreatedUser.save()

       if(newlyCreatedUser){
        res.status(201).json({
          success:true,
          message:"user registered user successfully"
        })
       }
       else{
        res.json({
          success:false,
          message:'unable to register user please try again'
        })
       }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success : false,
            message : 'Some error occured! Please try agian'
        });
    }
}


exports.loginUser = async(req,res) =>{
     try {
      console.log(req.body)
       const { username, password} = req.body;
       console.log('username',username,'password',password)
       //find if the current user is exists in the database or not
       const user = await User.findOne({username});

       if(!user){
        return res.status(400).json({
          success: false,
          message: "Invalid credentials!"
        });
       }

       if(!password){
         return res.status(400).json({
           success: false,
           message: "Password is required"
         });
       }

       if(!user.password){
         return res.status(500).json({
           success: false,
           message: "User password not found in database"
         });
       }

       // if the pasword is correct or not 
       const isPasswordMatch = await bcrypt.compare(password, user.password);

       if (!isPasswordMatch) {
         return res.status(400).json({
           success: false,
           message: "Invalid credentials!",
         });
       }

      // create token using jwt
      const accessToken = jwt.sign({
        userId: user._id,
        username: user.username,
        role: user.role,
      },process.env.JWT_SECRET_KEY,{
        expiresIn : '15m'
      })

      res.status(200).json({
        success : true,
        message : "Logged in successful",
        accessToken 
      })

     } catch (error) {
       console.log(error);
       res.status(500).json({
         success: false,
         message: "Some error occured! Please try agian",
       });
     }
}




// change password

exports.changePassword = async(req,res) =>{
   try {
      const userId = req.userInfo.userId;
      // extract old and new password
      const {oldPassword, newPassword} = req.body;
      // find the current logged in user
      const user = await User.findById(userId)
      if(!user){
        return res.status(400).json({
          success:false,
          message:'User not found'
        })
      }
      // check if the old password is correct
      const isPasswordMatch = await bcrypt.compare(oldPassword,user.password)
      if(!isPasswordMatch){
        return res.status(400).json({
          success : false,
          message: "old password is not correct! please try agian",
        });
      }
      // hasing the new password here
      const salt = await bcrypt.genSalt(10);
      const newHashedPassword = await bcrypt.hash(newPassword,salt);
      
      //update user password
      user.password = newHashedPassword;
      await user.save();
      res.status(200).json({
        success:true,
        message:"password reset successful"
      })

   } catch (error) {
    
   }
}