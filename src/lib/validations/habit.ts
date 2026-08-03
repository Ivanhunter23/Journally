import z from "zod";
import { HabitType, TimeOfDay } from "@/generated/prisma/enums";

export const createHabitSchema = z.object({
    name: z.string().min(1).max(100),
    type: z.enum(HabitType),
    targetValue: z.coerce.number().int().positive(),
    unit: z.preprocess(
        (value) => (value === "" ? undefined : value),
        z.string().optional()
    ),
    timeOfDay: z.preprocess(
        (value) => (value === "" ? undefined : value),
        z.enum(TimeOfDay).optional()
    )


})
export const logHabitSchema = z.object({
    habitId: z.string().min(1),
    value: z.coerce.number().int().positive().default(1),

    
})