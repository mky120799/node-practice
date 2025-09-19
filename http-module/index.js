const http = require('http')

const server = http.createServer((req,res)=>{
    console.log(req,'req')
    res.writeHead( 200 , {"content-type":"text/plain"})
    res.end("Hello node js from http module")
})

const PORT = 5050;


server.listen(PORT,()=>{
    console.dir(`server is listening at port ${PORT}`)
})