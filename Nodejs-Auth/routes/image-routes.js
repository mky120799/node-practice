const express = require("express");
const { authMiddleware } = require("../middleware/auth-middleware");
const isAdminUser = require("../middleware/admin-middleware");
const uploadMiddleware = require("../middleware/upload-middleware");
const { uploadImageController, fetchImageController, deleteImageController } = require("../controllers/image-controller");
const router = express.Router();

//upload the image
router.post(
  "/upload",
  authMiddleware,
  isAdminUser,
  uploadMiddleware.single("image"),
  uploadImageController,
 
);

// get the images

router.get('/fetch',authMiddleware,fetchImageController)
router.delete('/:id',authMiddleware,isAdminUser,deleteImageController)


module.exports = router;

//	68cba92a54400333a868baec
//	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGNiOGExYjZkZjc2YmI3YTEyNGVhYmUiLCJ1c2VybmFtZSI6IkpvaG4iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NTgxNzA4MDgsImV4cCI6MTc1ODE3MTcwOH0.ZLwPFhPdRjKkAbqWz1Dddpxn36yE3iC4RZq6BdtN-ug