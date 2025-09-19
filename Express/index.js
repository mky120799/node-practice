const express = require('express')
const path = require('path')
const server = express()


app.set('view engine','ejs');

app.set('views',path.join)
const PORT = 8080;
server.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
})

