const express = require("express");
const app = express();

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.url);
  next();
});

// routes


let books = [
    {
        id:"1",
        title:"Book1"
    },
    {
        id:"2",
        title:"Book2"
    }
]

app.get("/", (req, res) => {
  res.send("welcome to bookstore");
});


app.get('/get',(req,res,next)=>{
    res.json(books)
})




app.get('/get/:id',(req,res)=>{
    const book = books.find(item => item.id == req.params.id);
    if(book){
        res.status(200).json(book)
    }else {
        res.status(404).json({
            message: "book not found"
        })
    }
})


///add new book

app.post('/add',(req,res)=>{
    const newBook={
        id:Math.random()* 1000,
        title:`Books ${books.length + 1}`

    }
    books.push(newBook)
    res.status(200).json({
        data:newBook,
        message:"New book is added succcessfully"
    })
})

// update a book

app.put('/update/:id',(req,res)=>{
    const findCurrentBook = books.find(bookItem => bookItem.id === req.params.id)
    if(findCurrentBook){
        findCurrentBook.title = req.body.title || findCurrentBook.title
          res.status(200).json({
            data: findCurrentBook,
            message: `Book with ID ${req.params.id} updated successfully`,
          });
    }
  
  
    else res.status(404).json({
            message:"Book not found"
        })
 }
)
 

// delete book

app.delete('/delete/:id',(req,res)=>{
    const findIndexOfCurrentBook = books.findIndex(item=> item.id === req.params.id)
    if(findIndexOfCurrentBook !== -1)
    {
        const deletedBook = books.splice(findIndexOfCurrentBook,1)
        res.status(200).json({
            message:"book deleted successfully",
            data: books
        })
    }
    else{
        res.status(404).json({
            message:"book not not found to be deleted"
        })
    }
})












const PORT = 50;
app.listen(PORT, () => {
  console.log(`app is listening at port ${PORT}`);
});
