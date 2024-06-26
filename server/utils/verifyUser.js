import jwt from 'jsonwebtoken'

export const verifyUser=(req,res,next)=>{
    const token=req.cookies.teja_token
    if(!token){
        return next(errorHandler(401,"Unauthorised"))
    }
    jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
        if(err){
            return next(errorHandler(401,"Unauthorised"))
        }
        req.user=user;
        next();
    })
}