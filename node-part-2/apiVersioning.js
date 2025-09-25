const { error } = require("console");
const { application } = require("express");

const urlVersioning =(req,res,next)=>{
    if(req.path.startsWith(`/api/${version}`)){
     next()
    }else{
        res.status(404).json({
            success: false,
            error:"API version is not supported",
        });
    }
}

const headerVersion = (version) => (req,res,next)=>{
    if(req.get('Accept-Version') === version){
        next()
   }else{
    res.status(404).json({
        success:false,
        error:"API version is not supposted",
    })
   }
}

const contentTypeVersion = (version) =>{
    const contentType = req.get('Content-Type');
    if(contentType && contentType.includes(`application/vnd.api.${version}+json`))
    {next()}
    else{
        res.status(404).json({
           success:false,
           error: "API version is not supported",
        })
    }
}

module.exports = {urlVersioning, headerVersion, contentTypeVersion}