import z from "zod";

export const createPlanEntrySchema = z.object({
    text: z.string().min(1).max(500),

})

