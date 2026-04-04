import  { Request, Response } from "express";
import { getCategoryTotalsService, getTotalServcie } from "../services/dashboard.service";

export const getSummary=async (req:Request,res:Response)=>{
    const result =await getTotalServcie()
    return res.status(200).json(result)
}

export const getSummaryByCategory=async(req:Request,res:Response)=>{
    const result=await getCategoryTotalsService()
    return res.status(200).json(result)
}

export const getRecentActivity=()=>{

}

export const getTrends=()=>{

}