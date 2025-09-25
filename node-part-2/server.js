// server.js
const express = require("express");
const {
  APIError,
  asyncHandler,
  globalErrorHandler,
} = require("./errorHandler");

const app = express();

app.get(
  "/test",
  asyncHandler(async (req, res) => {
    throw new APIError("Test error", 400);
  })
);

app.use(globalErrorHandler);

app.listen(3000, () => console.log("Server running on port 3000"));
