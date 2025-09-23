const http = require('http');

const server = http.createServer((req,res)=>{
    const url = req.url;
    if(url === '/')
    {
        res.writeHead(200,{'contentType':'text/plain'});
        res.end("Home Page");
    }
    
})

const PORT = 6000;

server.listen(PORT, () => {
  console.dir(`server is listening at port ${PORT}`);
});