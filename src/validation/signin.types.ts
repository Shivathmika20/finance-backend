import { z } from "zod";

export const SigninSchema = z.object({
	email: z.email(),
	password: z.string().min(6).max(10),
});
