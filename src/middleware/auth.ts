import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from "express";
import { jwt_secret } from "../lib/config";
import  prisma  from '../lib/prisma';

type Role = 'VIEWER' | 'ADMIN' | 'ANALYST'


export const verifyJwt=async (req:Request,res:Response,next:NextFunction)=>{
    const token = req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.status(403).json({ message: "Token is missing" });

    }
    try{
        const decoded=jwt.verify(token,jwt_secret) as { userId: string; role: Role };
        if (!decoded || typeof decoded === "string" || !decoded.userId) {
        return res
            .status(403)
            .json({ message: "Unauthorized: Invalid token payload" });
        }

        const user = await prisma.user.findUnique({
            where: { id: decoded.userId }
          })
      
        if (!user) {
            return res.status(401).json({ message: 'User not found' })
          }

          
         // a deactivated user with valid token should still be blocked
        if(!user.isActive){
            return res.status(403).json({message:'Account has been deactivated'})
        }
      
        req.user=decoded;
       
        next(); 
    }
    catch{
        return res.status(401).json({ message: "Invalid or expired token" })
    }
     
}

export const allowRoles=(...roles: Role[])=>{
    return (req:Request,res:Response,next:NextFunction)=>{
        if(!roles.includes(req.user!.role)){
            return res.status(403).json({message:"Access denied"})
        }
        next()
    }
}

