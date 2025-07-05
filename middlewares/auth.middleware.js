import jwt from 'jsonwebtoken'
export const authuser = (req, res, next)=>{

    const token = req.cookies?.medium2token;

    if(!token){
        return res.status(400).json({
            message : "you need to signin again"
        })
    }
    try{
        const decoded =  jwt.verify(token, process.env.SECRET_KEY)
        req.user = decoded
        next()
    }
    catch(err){
        res.status(400).json({
            message : "invalid or expired token"
        })
    }
}