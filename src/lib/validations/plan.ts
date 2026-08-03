import z from "zod";

export const createPlanEntrySchema = z.object({
    text: z.string().trim().min(1).max(500),

})

