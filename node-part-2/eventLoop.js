const fs = require('fs')
const crypto = require('crypto')


console.log('1. script start');
setTimeout(()=>{
    console.log(`2. settimout 0s callback(macrotask)`)
},0)


setTimeout(()=>{
    console.log('3. settimeout 0s callback (macrotask)')
},0)

setImmediate(()=>{
    console.log('4. setImmediate callback (check');
})

Promise.resolve().then(()=>{
    console.log('5. Promsie resolved (microtask)')
});

process.nextTick(()=>{
    console.log('6. process.nexttick  callback (microtask');
})

fs.readFile(__filename, ()=>{
    console.log('7.file read operattion (I/O callback');
})

crypto.pbkdf2('sceret','salt',10000,64,'sha512',(err,key)=>{
    if(err) throw err
    console.log('8. pbkdf2 operation (CPU intensive task');
})


console.log('9. script ends')