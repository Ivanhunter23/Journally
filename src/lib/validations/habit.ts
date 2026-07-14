import z from "zod";
export const createHabitSchema = z.object({
    name: z.string().min(1).max(100),
    type: z.enum(["BINARY", "QUANTITATIVE"]),
    targetValue: z.coerce.number().int().positive(),
    unit: z.string().optional(),
    timeOfDay: z.enum(["MORNING", "EVENING"]).optional()


})