import jwt from "jsonwebtoken"
export const verifytoken = (req, res)=>{
    const checktoken = req.cookies?.medium2token
    if(!checktoken){
        return res.status(400).json({
            message : "signin needed"
        })
    }
    try{
        const decoded = jwt.verify(checktoken, process.env.SECRET_KEY)
        return  res.status(200).json({
            sucess : true
        })
    }
    catch(err){
       return  res.status(400).json({
            message : "invalid or expired token"
        })
    }
}