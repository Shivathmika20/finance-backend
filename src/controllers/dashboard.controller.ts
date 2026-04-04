import  { Request, Response } from "express";
import { getCategoryTotalsService, getRecentService, getTotalServcie, getTrendsService } from "../services/dashboard.service";

export const getSummary=async (req:Request,res:Response)=>{
    const result =await getTotalServcie()
    return res.status(200).json(result)
}

export const getSummaryByCategory=async(req:Request,res:Response)=>{
    const result=await getCategoryTotalsService()
    return res.status(200).json(result)
}

export const getRecentActivity=async (req:Request,res:Response)=>{
    const result=await getRecentService()
    return res.status(200).json(result)
}

export const getTrends=async(req:Request,res:Response)=>{
    const result=await getTrendsService()
    return res.status(200).json(result)
}