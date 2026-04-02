import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import bcrypt from "bcrypt";
import SignupSchema from "../validation/signup.types";
import { Prisma } from "../generated/prisma/client";
import jwt from "jsonwebtoken";


const jwt_secret=`${process.env.JWT_SECRET}`

export const signup = async (req: Request, res: Response) => {
	const parsed = SignupSchema.safeParse(req.body);
	if (!parsed.success) {
		return res.status(400).json({
			message: "Invalid Inputs",
			issues: parsed.error.issues,
		});
	}

	const { username, email, password } = parsed.data;
	try {
		const existingUser = await prisma.user.findFirst({
			where: {
				OR: [{ username }, { email }],
			},
		});
		if (existingUser) {
			return res.status(409).json({ message: "User already exists" });
		}

		const hashedPassword = await bcrypt.hash(password, 5);
		const newUser = await prisma.user.create({
			data: {
				username,
				email,
				password: hashedPassword,
			},
		});
		return res.status(201).json({
			message: "user created successfully",
			userInfo: newUser,
		});
	} catch (e) {
		if (e instanceof Prisma.PrismaClientValidationError) {
			return res.status(400).json({ message: e.message });
		}
		const message = e instanceof Error ? e.message : "Unknown error";
		return res.status(500).json({ message });
	}
};

export const signin = async (req: Request, res: Response) => {
    const {email,password}=req.body
    try{
        const user=await prisma.user.findFirst({
            where:{
                email
            }
        })
        if(!user){
            return res.status(401).json({
                message:"User doesnt exist, Please Signup"
            })
        }

        const isPasswordValid=await bcrypt.compare(
            password,
            user?.password
        )
        
        if(isPasswordValid){
            if(!jwt_secret){
                return res
					.status(400)
					.json({ message: "JWT_SECRET is not set" });
            }
            const token =jwt.sign({userId:user.id,role:user.role},jwt_secret,{
                expiresIn:"1h"
            })
            return res.status(200).json({ token, message: "Login successful" });
            
        }
        else{
            return res.status(401).json({
                message:"Invalid password,failed to signin"
            })
        }

    }
    catch{
        return res.status(500).json({
            message:"internal server error"
        })
    }
};
