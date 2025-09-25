const cors = require('cors');

const configureCors =()=>{
    return cors({
        //origin-> this will tell that which origins you want that can access/allowed to your api
        origin:(origin,callback)=>{
            const allowedOrigins = [
                'http://localhost:3000',
                'http://yourcustomdomain.com'//production domain
            ]
                if(!origin || allowedOrigins.indexOf(origin)!== -1){
                    callback(null,true)// giving permission so that req can be allowed
                }else{
                    callback(new Error('Not allowed by cors'))
                }
            },
            methods : ['GET','POST','PUT','DELETE'],
            allowedHeaders : [
                'Content-type',
                'Authorization',
                'Accept-Version',
            ]
        });
};
