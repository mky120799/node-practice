const Image = require("../model/image");
const { uploadToCloudinary } = require("../helpers/cloudinaryHelper");
const cloudinary  = require('../config/cloudinary')

exports.uploadImageController = async (req, res) => {
  try {
    // check if file is missing in req object
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "File is required. Please upload an image",
      });
    }

    // upload to cloudinary
    const { url, publicId } = await uploadToCloudinary(req.file.path);

    // store the image url and public id along with the uploaded user id
    const newlyUploadedImage = new Image({
      url,
      publicId,
      uploadedBy: req.userInfo.userId,
    });
 
    await newlyUploadedImage.save();

    res.status(201).json({
      success: true,
      message: "Image uploaded successfully",
      image: newlyUploadedImage,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again later",
      error: error.message, // optional, for debugging
    });
  }
};



exports.fetchImageController = async (req, res)=>{
    try{
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 2;
      const skip = (page - 1) * limit;
      const sortBy = req.query.sortBy || 'createdAt';
      const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;
      const totalImages = await Image.countDocuments();
      const totalPages = Math.ceil(totalImages / limit);

      const sortObj = {};
      sortObj[sortBy] = sortOrder
      const images = await Image.find().sort(sortObj).skip(skip).limit(limit);

      
      if(images){
        res.json({

            success: true,
            data: images,
            currentPage:page,
            totalImages:totalImages,
            totalPages:totalPages,
            
        })
      }
    }catch(error){
        console.log(error);
        res.status(500).json({
            success : false,
            message : "Something went wrong"
        })
    }
}

exports.deleteImageController = async(req,res)=>{
    try {
      const getCurrentIdOfImageToBeDeleted = req.params.id;
      const userId = req.userInfo.userId
      const image = await Image.findById(getCurrentIdOfImageToBeDeleted);

      if(!image){
        return res.status(400).json({
            success:false,
            message:"Image not found"
        })
      }
      if(image.uploadedBy.toString() !== userId){
        return res.status(403).json({
            success: false,
            message: "You aren't authorised to delete this image"
        })
      }
      // delete this image first from your cloudinary storage
      await cloudinary.uploader.destroy(image.publicId);

      //delete this image from mongoose database
      await Image.findByIdAndDelete(getCurrentIdOfImageToBeDeleted)
      res.status(200).json({
        success : true,
        message : "image deleted successfully",
      })

    } catch (error) {
        console.error(error)
        res.status(500).json({
            success:false,
            message:"Something went wrong! Please try again"
        })
    }
}


