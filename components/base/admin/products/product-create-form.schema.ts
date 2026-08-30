import { z } from "zod"

export const productCreateFormSchema = z.object({
    name: z.string().trim().min(1, { message: "Name is required" }),
    description: z.string().trim().optional(),
    price: z
        .string()
        .trim()
        .min(1, { message: "Price is required" })
        .refine((value) => !Number.isNaN(Number(value)), {
            message: "Price must be a valid number",
        })
        .refine((value) => Number(value) >= 0, {
            message: "Price must be 0 or greater",
        }),
})

export type ProductCreateFormSchema = z.infer<typeof productCreateFormSchema>
