import { z } from "zod";

const SignupSchema = z.object({
	username: z.string().min(3).max(20),
	email: z.email(),
	password: z.string().min(6).max(10),
});

export default SignupSchema;

