const jwt = require('jsonwebtoken');

const verifyToken = async (req,res,next)=>{
    let token = req.headers['authorization']

    if(token){ 
        token = token.split(" ")[1]
        jwt.verify(token,process.env.JWT_TOKEN,(err,decoded)=>{
            if(err){
                return res.status(400).json({message : "invalid token"})
            }else {
                // console.log(decoded)  
                req.user = decoded
            }
        })
        next()
    }else {
        return res.status(400).json({message : "invalid token"})
    }
}
module.exports = verifyToken