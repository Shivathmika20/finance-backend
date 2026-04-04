import  { Request, Response } from "express";
import prisma from "../lib/prisma";
import { createRecordSchema,updateRecordSchema } from "../validation/record.type";
import { createRecordService ,getRecordsService} from "../services/record.service";


export const getAllRecords=async (req:Request,res:Response)=>{
   const data=req.query
   const pageData=req.pagination!
   try{
    const result=await getRecordsService(data,pageData)
    return res.status(200).json({
       result
    })
   }
   catch(e){
    return res.status(500).json({ message: "Internal server error" ,e})

   }
}

export const getRecord=async (req:Request,res:Response)=>{
    const recordId = parseInt(req.params['id'] as string)
    const record=await prisma.record.findUnique({
    where:{id:recordId}
    })

    if (!record || record.isDeleted) {
        return res.status(404).json({ message: 'Record not found' })
    }

    return res.status(200).json(record)

}

export const createRecord=async(req:Request,res:Response)=>{
    const parsedData=createRecordSchema.safeParse(req.body)
    if(!parsedData.success){
        return res.status(400).json({
            message: "Invalid Inputs",
			issues: parsedData.error.issues,
        })
    }
    try{
        const record=await createRecordService(parsedData.data,req.user!.userId)
        return res.status(201).json({message:"record created",record})
    }
    catch(e){
        return res.status(500).json({ message: "Internal server error" })
    }
}

export const updateRecord=async (req:Request,res:Response)=>{
    const recordId = parseInt(req.params['id'] as string)
    
    try{
        const parsedData=updateRecordSchema.safeParse(req.body)
        if(!parsedData.success){
            return res.status(400).json({
                message: "Invalid Inputs",
                issues: parsedData.error.issues,
            })
        }
        const existingRecord=await prisma.record.findUnique({
            where:{id:recordId}
            })
        
        if (!existingRecord || existingRecord.isDeleted) {
           return res.status(404).json({message:"Record not found"})
          }
        
        const record=await prisma.record.update({
            where:{id:recordId},
            data:{
                ...parsedData.data,
                ...(parsedData.data.date && { date: new Date(parsedData.data.date) })
            }
          })
          return res.status(200).json({message:"record updated",record})
    
       
    }
    catch(e){
        return res.status(500).json({ message: "Internal server error" })
    }
    
}

export const deleteRecord=async (req:Request,res:Response)=>{
    const recordId = parseInt(req.params['id'] as string)

    try{
        const existingRecord=await prisma.record.findUnique({
            where:{id:recordId}
            })
        
        if (!existingRecord || existingRecord.isDeleted) {
           return res.status(404).json({message:"Record not found"})
          }
        const record=await prisma.record.update({   //soft deleting
            where:{id:recordId},
            data:{
                isDeleted:true,
                deletedAt: new Date() 
            }
        })
        return res.status(200).json({message:"Record deleted",record})
    }
    catch{
        return res.status(500).json({ message: "Internal server error" })
    }
}