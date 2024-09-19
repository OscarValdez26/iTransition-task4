import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

export const authRequired = (request, response, next) => {
    const {token} = request.cookies;
    if(!token){
        return response.status(401).json({message:"Unauthorized"});
    }
    else{
        jwt.verify(token, TOKEN_SECRET,(err,decoded)=>{
            if(err){
                return response.status(403).json({message:"Invalid token"});
            }
            else{
                request.user = decoded;
                next();
            }
        });
    }
}