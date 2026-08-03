"use server";
import { getToday } from "@/lib/date";
import { prisma } from "@/lib/prisma";
import { requireUserId } from "@/lib/session";
import { journalEntrySchema } from "@/lib/validations/journal";
import {revalidatePath} from "next/cache";

export async function logJournal(formData: FormData){
    const userId = await requireUserId();


    const parsed = journalEntrySchema.safeParse(Object.fromEntries(formData));
        if(!parsed.success) return {error: "Invalid input"}


    const today = getToday();


    const guidedAnswers = {
        wentWell: parsed.data.wentWell,
        improve: parsed.data.improve,
        gratitude: parsed.data.gratitude,
    };
    
    await prisma.journalEntry.upsert({
            where: {userId_date: {userId, date: today}},
            create: {userId, date: today, guidedAnswers, freeText: parsed.data.freeText },
            update: {guidedAnswers, freeText: parsed.data.freeText},
        });

    revalidatePath("/dashboard");
        
}