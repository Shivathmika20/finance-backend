import z from "zod";

export const assignRoleSchema=z.object({
    role:z.enum(['VIEWER','ADMIN','ANALYST'])
})

export type AssignRoleBody = z.infer<typeof assignRoleSchema>;