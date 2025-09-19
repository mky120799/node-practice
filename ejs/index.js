const path = require('path')
const express = require('express');
const server = express();
const PORT = 5000;

server.set('view ejs','ejs')
server.set('views',__dirname + 'views')
server.use(express.static(path.join(__dirname,'public')));

server.get()


server.listen(PORT,()=>{
    console.log(`server is listening at port${PORT}`)
})
