import { Request, Response } from "express";
import prisma from "../lib/prisma";
import bcrypt from "bcrypt";
import SignupSchema from "../validation/signup.types";
import { Prisma } from "../generated/prisma/client";
import jwt from "jsonwebtoken";
import { jwt_secret } from "../lib/config";
import { SigninSchema } from "../validation/signin.types";

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
			select: {
				id: true,
				username: true,
				email: true,
				role: true,
				isActive: true,
				createdAt: true,
			},
		});
		return res.status(201).json({
			message: "user created successfully",
			userInfo: newUser,
		});
	} 
	catch (e) {
		if (e instanceof Prisma.PrismaClientValidationError) {
			return res.status(400).json({ message: (e as Error).message });
		}
		const message = e instanceof Error ? e.message : "Unknown error";
		return res.status(500).json({ message });
	}
};

export const signin = async (req: Request, res: Response) => {
	const parsed = SigninSchema.safeParse(req.body);
	if (!parsed.success) {
		return res.status(400).json({
			message: "Invalid Inputs",
			issues: parsed.error.issues,
		});
	}

	const { email, password } = parsed.data
	try {
		const user = await prisma.user.findFirst({
			where: {
				email,
			},
		});
		if (!user) {
			return res.status(401).json({
				message: "User doesnt exist, Please Signup",
			});
		}

		const isPasswordValid = await bcrypt.compare(password, user?.password);

		if (isPasswordValid) {
			if (!user.isActive) {
				return res.status(403).json({
					message: "Account has been deactivated",
				});
			}
			const token = jwt.sign(
				{ userId: user.id, role: user.role },
				jwt_secret,
				{expiresIn:'6h'}
			);
			return res.status(200).json({ token, message: "Login successful" });
		} else {
			return res.status(401).json({
				message: "Invalid password,failed to signin",
			});
		}
	} catch {
		return res.status(500).json({
			message: "internal server error",
		});
	}
};
