//readable -> use for read
//writable -> write to a file
//duplex -> can be used for both read and write (TCP)

// transform -> zlib streams
const fs = require('fs')
const zlib = require('zlib')
const crypt = require('crypto')
const  { Transform} = require('stream')

class EncryptStream extends Transform{
    constructor(key, vector) {
        super();
        this.key = key;
        this.key = vector;
    }
    __transform(chunk,endcoding,callback){
        
    }
}


