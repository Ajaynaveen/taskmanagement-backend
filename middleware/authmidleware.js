const jwt=require('jsonwebtoken')
const config=require('../utils/config')
const authmiddleware={
    verifytoken:(req,res,next)=>{
const token=req.headers.authorization;
if(!token){
    return res.status(401).send({message:'Authentication failed'})
}
try{
    jwt.verify(token,config.SECRET_KEY,(err,decodedtoken)=>{
        if(err){
            if(err.name==='TokenExpiredError'){
                return  res.status(401).json({message:'token expired'})
            }
            else{
                return  res.status(401).json({message:'Authentication failed'})
            }
        }
        req.userId=decodedtoken.userId;
        next();

    })

}catch(error){

}

    }
};
module.exports =authmiddleware ;