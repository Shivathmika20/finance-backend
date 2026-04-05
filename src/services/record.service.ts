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

export type Pagination={
  page:number,
  limit:number,
  skip:number,

}


export const createRecordService=async (
    recordData:RecordInput,
    userId:string
)=>{
    
    return await prisma.record.create({
        data:{
            ...recordData,
            category:recordData.category.toLowerCase(),
            date:new Date(recordData.date),
            userId
        }
    })
   

}

export const getRecordsService = async (filters:Filter,pages:Pagination) => {
    const { type, category, startDate, endDate, search} = filters
    const {page,limit,skip}=pages
    const categoryFilter =
      typeof category === 'string' && category.length > 0
        ? category.toLowerCase()
        : undefined

     const where= {
        isDeleted: false,
        ...(type && { type }),
        ...(categoryFilter && { category: categoryFilter }),
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
      }
      
      const [records,total]=await Promise.all([
        prisma.record.findMany({
          where,
          skip,
          take:limit,
          select:{
            id: true,
            type: true,
            amount: true,
            category: true,
            date: true,
            notes: true,
            createdAt: true
          }
        }),
        prisma.record.count({where})
      ])
      return{
        data:records,
        total,
        page,
        limit,
        totalPages:Math.ceil(total/limit)
      }
    }
    
  


