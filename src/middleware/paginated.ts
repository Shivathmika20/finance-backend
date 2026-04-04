import { Request, Response, NextFunction } from "express";
import prisma from "../lib/prisma";


export const paginate=async(req:Request,res:Response,next:NextFunction)=>{
   const page=parseInt(req.query.page as string)||1
   const limit=parseInt(req.query.limit as string)||5

   const skip=(page-1)*limit
   

   req.pagination={page,limit,skip}
   next()
   
}