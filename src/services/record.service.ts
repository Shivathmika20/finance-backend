import prisma from "../lib/prisma";
import { RecordType } from "../generated/prisma/enums";


type RecordInput ={
    amount: number
    type:RecordType
    category: string
    date: string
    notes?: string
  }

export const createRecordService=async (
    recordData:RecordInput,
    userId:string
)=>{
    
    return await prisma.record.create({
        data:{
            ...recordData,
            date:new Date(recordData.date),
            userId
        }
    })
   

}


