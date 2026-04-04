import { Request, Response } from "express";
import prisma from "../lib/prisma";
import { assignRoleService, getUserPagesService, toggleStatusService } from "../services/user.service";



export const getAllUsers = async (req: Request, res: Response) => {
	
	// 	select: {
	// 		id: true,
	// 		username: true,
	// 		email: true,
	// 		role: true,
	// 		isActive: true,
	// 		createdAt: true,
	// 	},
	// });
    const pageData=req.pagination!
    try{
        const result=await getUserPagesService(pageData)
	    return res.status(200).json({
		message:"Fetched successfully",
        result
	    });
    }catch(e){
        return res.status(500).json({ message: e })

    }
};

export const getUser = async (req: Request, res: Response) => {
	const  id  =  req.params['id'] as string
	try{
        const user = await prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                username: true,
                email: true,
                role: true,
                isActive: true,
                createdAt: true,
            },
        });
        if(!user){
            return res.status(404).json({message:"user not found"})
        }
        return res.status(200).json({user})
    }
    catch(e){
        return res.status(500).json({ message: e })

    }
};

export const assignRole = async (req: Request, res: Response) => {
    const id  =  req.params['id'] as string
    const role=req.body
    try{
        const user=await assignRoleService(id,role,req.user?.userId)
        return res.status(200).json({message:"Role updated",user})
    }
    catch(e){
        if (e instanceof Error){
            return res.status(400).json({ message: e.message })
        }
        return res.status(500).json({ message: "Internal server error" })
    }
    
    
};

export const toggleStatus = async (req: Request, res: Response) => {
    const id  =  req.params['id'] as string
    const status=req.body.status as boolean

    if (typeof status !== 'boolean') {
        return res.status(400).json({ message: "Status must be a boolean" })
      }
    try{
        const user=await toggleStatusService(id,status,req.user?.userId)
        return res.status(200).json({ 
            message: status ? "User activated" : "User deactivated", 
            user 
          })
    }
    catch(e){
        if (e instanceof Error){
            return res.status(400).json({ message: e.message })
        }
        return res.status(500).json({ message: "Internal server error" })  
    }
};
