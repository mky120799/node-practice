




const searchPostController = async(req,res)=>{
    logger.info('Search endpoint hit!')
    try {
         const query = req.query;
         const result = await find()
    } catch (error) {
        res.status(500).json({
            success:false,
            message:'Internal errror',
            error:error
        })
    }
}