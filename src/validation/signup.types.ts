import { z } from "zod";

const SignupSchema = z.object({
	username: z.string().min(3).max(20),
	email: z.string().email(),
	password: z.string().min(8).max(20),
});

export default SignupSchema;

