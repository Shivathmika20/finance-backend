import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export const getAllUsers = async (req: Request, res: Response) => {
	const users = await prisma.user.findMany({
		orderBy: { createdAt: "asc" },
		select: {
			id: true,
			username: true,
			email: true,
			role: true,
			isActive: true,
			createdAt: true,
		},
	});

	return res.status(200).json({
		users,
	});
};

export const getUser = async (req: Request, res: Response) => {
	const  id  =  req.params['id'] as string
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
};

export const assignRole = async (req: Request, res: Response) => {};

export const getStatus = async (req: Request, res: Response) => {};
