const { isUtf8 } = require('buffer');
const fs = require('fs')

fs.writeFile('notes.txt','hello world',(err)=>{
    if(err) throw err;
    console.log('File created and written');
})

fs.readFile('notes.txt','utf8',(err,data)=>{
    if(err) throw err;
    console.log(data)
})

fs.appendFile('notes.txt','/n this is the appended line',(err)=>{
      if(err) throw err;
      console.log('file appended')
})

fs.mkdir('my_folder',{recursive:true},(err)=>{
    if(err) throw err;
    console.log('directory created')
})