const RefreshToken = require("../models/RefreshToken");
const User = require("../models/User");
const logger = require("../utils/logger");
const generateTokens = require("../utils/generateTokens");
const {
  validationRegistration,
  validationlogin,
} = require("../utils/validation");

// User Registration
let registerUser = async (req, res) => {
  logger.info("Registration endpoint hit...");
  try {
    // Validate request body
    const { error } = validationRegistration(req.body);
    if (error) {
      logger.warn("Validation error", error.details[0].message);
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const { email, password, username } = req.body;

    // Check if user already exists
    let user = await User.findOne({ $or: [{ email }, { username }] });
    if (user) {
      logger.warn("User already exists");
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Create new user
    user = new User({ username, email, password });
    await user.save();
    logger.info("User saved successfully", user._id);

    // Generate tokens
    const { accessToken, refreshToken } = await generateTokens(user);

    res.status(201).json({
      success: true,
      message: "User registered successfully!",
      accessToken,
      refreshToken,
    });
  } catch (e) {
    logger.error("Registration error occurred", e);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// loginUser
let loginUser = async (req, res) => {
  logger.info("Login endpoint hit...");
  try {
    // Validate request body
    const { error } = validationlogin(req.body);
    if (error) {
      logger.warn("Validation error", error.details[0].message);
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      logger.warn("Invalid user");
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Check password
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      logger.warn("Invalid password");
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

    // Generate tokens
    const { accessToken, refreshToken } = await generateTokens(user);

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      accessToken,
      refreshToken,
    });
  } catch (e) {
    logger.error("Login error occurred", e);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


//refresh token
const refreshTokenUser = async (req, res) => {
  logger.info("Refresh token endpoint hit...");
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      logger.warn("Refresh token missing");
      return res.status(400).json({
        success: false,
        message: "Refresh token missing",
      });
    }

    let storedToken = await RefreshToken.findOne({ token: refreshToken });
    if (!storedToken || storedToken.expiresAt < new Date()) {
      logger.warn("Invalid or expired token");
      return res.status(401).json({
        success: false,
        message: "Invalid or expired refresh token",
      });
    }

    await RefreshToken.deleteOne({ token: refreshToken });

    // Optionally, generate new tokens for the user
    const user = await User.findById(storedToken.userId);
    if (!user) {
      logger.warn("User not found for refresh token");
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const { accessToken, refreshToken: newRefreshToken } = await generateTokens(user);

    res.status(200).json({
      success: true,
      message: "Token refreshed successfully",
      accessToken,
      refreshToken: newRefreshToken,
    });
  } catch (e) {
    logger.error("Refresh token error occurred", e);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//logout

const logoutUser = async (req, res) => {
  logger.info("Logout endpoint hit....");
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      logger.warn("Refresh token missing");
      return res.status(400).json({
        success: false,
        message: "Refresh token missing",
      });
    }
    await RefreshToken.deleteOne({ token: refreshToken });
    logger.info("Refresh token deleted for logout");
    res.json({
      success: true,
      message: "Logged out successfully"
    });
  } catch (e) {
    logger.error("Error while logging out", e);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


module.exports = {registerUser,loginUser,logoutUser,refreshTokenUser}