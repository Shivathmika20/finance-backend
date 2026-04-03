import z from "zod";

export const assignRoleSchema=z.object({
    role:z.enum(['VIEWER','ADMIN','ANALYST'])
})