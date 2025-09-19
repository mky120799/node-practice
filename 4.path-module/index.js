const path = require('path')

console.log('Directory name:', path.dirname(__filename))

console.log("join path operation:", path.join('hello','world','index.js'))

console.log('resolve path opersation',path.resolve('?product///helo',path.basename(__filename)))

console.log()
