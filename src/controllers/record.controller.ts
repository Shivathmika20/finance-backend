import { Request, Response } from "express";
import prisma from "../lib/prisma";
import { recordSchema } from "../validation/record.type";
import { createRecordService } from "../services/route.service";



export const getAllRecords=()=>{

}

export const getRecord=()=>{
    
}

export const createRecord=async(req:Request,res:Response)=>{
    const parsedData=recordSchema.safeParse(req.body)
    if(!parsedData.success){
        return res.status(400).json({
            message: "Invalid Inputs",
			issues: parsedData.error.issues,
        })
    }
    try{
        const record=await createRecordService(parsedData.data,(req as any).user?.userId)
        return res.status(201).json({message:"record created",record})
    }
    catch(e){
        return res.status(500).json({ message: "Internal server error" })
    }
}

export const updateRecord=()=>{
    
}

export const deleteRecord=()=>{
    
}