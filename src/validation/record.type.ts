import z from "zod";


export const createRecordSchema=z.object({
    amount:z.number().positive('Amount must be greater than 0'),
    type:z.enum(['INCOME','EXPENSE']),
    category:z.string().min(1,'Category is required'),
    date: z.string().refine(val => !isNaN(Date.parse(val)), {
        message: "Invalid date format"
      }),
    notes:z.string().optional()
})

export const updateRecordSchema = createRecordSchema.partial()
