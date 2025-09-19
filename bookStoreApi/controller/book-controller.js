const { get } = require("mongoose");
const Book = require("../models/book");

const getAllBooks = async (req, res) => {
  try {
    const allBooks = await Book.find({});
    if (allBooks?.length > 0) {
      res.status(200).json({
        success: true,
        message: "List of books fetched successfully",
        data: allBooks,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No books found in collections",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "something went wrong ! Please try again",
    });
  }
};

const getSingleBookById = async (req, res) => {
  try {
    const getCurrentBookID = req.params.id;
    const bookDetailsByID = await Book.findById(getCurrentBookID);

    if (!bookDetailsByID) {
      return res.status(404).json({
        success: false,
        message:
          "books with given ID is not found! Please try with a different ID",
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "Book details fetched successfully",
        data: bookDetailsByID,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again",
    });
  }
};

const addNewBook = async (req, res) => {
  try {
    const newBookFormData = req.body;
    const newlyCreatedBook = await Book.create(newBookFormData);
    if (newlyCreatedBook) {
      res.status(201).json({
        success: true,
        message: "Book added",
        data: newlyCreatedBook,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const updateBook = async (req, res) => {
  try {
    const updatedBookFormData = req.body;
    const getCurrentBookID = req.params.id;
    const updatedBook = await Book.findByIdAndUpdate(
      getCurrentBookID,
      updatedBookFormData,
      { new: true }
    );
    if (!updatedBook) {
      return res.status(404).json({
        success: false,
        message: "Book to update is not found",
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "Book updated successfully",
        data: updatedBook,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again",
    });
  }
};

const deleteBook = async (req, res) => {
  try {
    const getCurrentBookID = req.params.id;
    const deletedBook = await Book.findByIdAndDelete(getCurrentBookID);
    if (!deleteBook) {
      res.status(404).json({
        success: false,
        message: " Book to delete is not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "book deleted successfully",
        data: deletedBook,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllBooks,
  getSingleBookById,
  addNewBook,
  updateBook,
  deleteBook,
};
