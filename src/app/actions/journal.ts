"use server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { journalEntrySchema } from "@/lib/validations/journal";
import {revalidatePath} from "next/cache";

export async function logJournal(formData: FormData){
    const session = await auth();
        if(!session?.user?.id)
            return {error: "UNAUTHORIZED"}


    
  

    const parsed = journalEntrySchema.safeParse(Object.fromEntries(formData));
        if(!parsed.success) return {error: "Invalid input"}


    const now = new Date();
    const today = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
    
    const guidedAnswers = {
        wentWell: parsed.data.wentWell,
        improve: parsed.data.improve,
        gratitude: parsed.data.gratitude,
    };
    
    await prisma.journalEntry.upsert({
            where: {userId_date: {userId: session.user.id, date: today}},
            create: {userId: session.user.id, date: today, guidedAnswers, freeText: parsed.data.freeText },
            update: {guidedAnswers, freeText: parsed.data.freeText},
        });

    revalidatePath("/dashboard");
        
}