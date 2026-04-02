import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import bcrypt from "bcrypt";
import SignupSchema from "../validation/signup.types";
import { Prisma } from "../generated/prisma/client";



export const signup = async (req: Request, res: Response) => {
	const parsed = SignupSchema.safeParse(req.body);
	if (!parsed.success) {
		return res.status(400).json({
			message: "Invalid request body",
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
		return res.status(200).json({
			message: "user created successfully",
			userInfo: newUser,
		});
	} 
    catch (e) {
        if (e instanceof Prisma.PrismaClientValidationError) {
          return res.status(400).json({ message: e.message })
        }
        const message = e instanceof Error ? e.message : 'Unknown error'
        return res.status(500).json({ message })
      }
};

export const login = async (req: Request, res: Response) => {};
