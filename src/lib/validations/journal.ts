import z from "zod";
export const journalEntrySchema = z.object({
    wentWell: z.string().optional(),
    improve: z.string().optional(),
    gratitude: z.string().optional(),
    freeText: z.string().optional(),
});