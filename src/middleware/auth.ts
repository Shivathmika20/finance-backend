import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from "express";
import { jwt_secret } from "../lib/config";

type Role = 'VIEWER' | 'ADMIN' | 'ANALYST'


export const verifyJwt=(req:Request,res:Response,next:NextFunction)=>{
    const token = req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.status(403).json({ message: "Token is missing" });

    }
    try{
        const decoded=jwt.verify(token,jwt_secret);
        if (!decoded || typeof decoded === "string" || !decoded.userId) {
        return res
            .status(403)
            .json({ message: "Unauthorized: Invalid token payload" });
        }
        (req as any).user=decoded;
        next(); 
    }
    catch{
        return res.status(401).json({ message: "Invalid or expired token" })
    }
     
}

export const allowRoles=(...roles: Role[])=>{
    return (req:Request,res:Response,next:NextFunction)=>{
        if(!roles.includes((req as any).user.role)){
            return res.status(403).json({message:"Access denied"})
        }
        next()
    }
}

