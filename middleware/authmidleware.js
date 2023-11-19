// const jwt=require('jsonwebtoken')
// const config=require('../utils/config')
// const authmiddleware={
//     verifytoken:(req,res,next)=>{
// const token=req.headers.authorization;
// if(!token){
//     return res.status(401).send({message:'Authentication failed'})
// }
// try{
//     jwt.verify(token,config.SECRET_KEY,(err,decodedtoken)=>{
//         if(err){
//             if(err.name==='TokenExpiredError'){
//                 return  res.status(401).json({message:'token expired'})
//             }
//             else{
//                 return  res.status(401).json({message:'Authentication failed'})
//             }
//         }
//         req.userId=decodedtoken.userId;
//         next();

//     })

// }catch(error){

// }

//     }
// };
// module.exports =authmiddleware ;


const jwt = require('jsonwebtoken');
const config = require('../utils/config');

const authmiddleware = {
  verifytoken: (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Authentication failed: Token missing' });
    }
    try {
      jwt.verify(token, config.SECRET_KEY, (err, decodedtoken) => {
        if (err) {
          if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired' });
          } else {
            return res.status(401).json({ message: 'Authentication failed' });
          }
        }
        // Store the user ID in the request for later use
        req.userId = decodedtoken.userId;
        next();
      });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  },
};



module.exports = authmiddleware;
