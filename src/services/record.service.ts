import prisma from "../lib/prisma";
import { RecordType } from "../generated/prisma/enums";


type RecordInput ={
    amount: number
    type:RecordType
    category: string
    date: string
    notes?: string
  }

type Filter= {
  type?: RecordType
  category?: string
  startDate?: string
  endDate?: string
  search?:string
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

export const getRecordsService = async (filters:Filter) => {
    const { type, category, startDate, endDate, search} = filters
  
     return await prisma.record.findMany({
      where: {
        isDeleted: false,
        ...(type && { type }),
        ...(category && { category }),
        ...((startDate || endDate) && {
            date: {
              ...(startDate && { gte: new Date(startDate) }),
              ...(endDate && { lte: new Date(endDate) })
              }
        }),
        ...(search && {
          OR:[
            {category:{contains:search}},
            {notes:{contains:search}}
          ]
        })


      },

      
    })
    
  }


