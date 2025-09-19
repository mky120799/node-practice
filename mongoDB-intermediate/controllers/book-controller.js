const Author = require('../models/Author')

const Books = require('../models/Books');



const createBook = async(req,res)=>{
    try {
         const books = new Books(req.body);
          await books.save()
        res.status(201).json({
          success: true,
          message: "Book created successfully",
          data: books,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
          success: false,
          message: "Some error occured",
        });
    }
}



const createAuthor = async (req, res) => {
  try {
    const author = new Author(req.body);
    await author.save();
    res.status(201).json({
      success: true,
      data: author,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

const getBookWithAuthor = async(req,res)=>{
    try {
        const book = await Books.findById(req.params.id).populate('author')
        if(!book){
            return res.status(204).json({
                success:false,
                message:'Book not found!'
            })
        }
        res.status(200).json({
            success:true,
            data:book
        })
    } catch (error) {
        console.log(e);
        res.status(500).json({
            success:false,
            message: 'Some error occurred'
        })
    }
}

module.exports={ createAuthor, createBook, getBookWithAuthor }