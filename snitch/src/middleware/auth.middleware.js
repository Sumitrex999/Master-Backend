import { config } from "dotenv";
import jwt from "jsonwebtoken"


function authenticate(req, res, next){

    const token = req.headers.authorization?.split(" ")[1]

    if(!token){
        return res.status(401).json({
            message:"Token not found"
        })
    }
    try{
        const decoded = jwt.verify(token, config.JWT_SECRET)

        req.user = decoded

        next()
    } catch(err){
        return res.status(401).json({
            message:"Invalid or expired token"
        })
    }
}

export default authenticate