"use server";

import { getToday } from "@/lib/date";
import { prisma } from "@/lib/prisma";
import { requireUserId } from "@/lib/session";
import { createPlanEntrySchema } from "@/lib/validations/plan";
import { revalidatePath } from "next/cache";
import z from "zod";

export async function createPlanEntry(formData: FormData){
    const userId = await requireUserId();

    const parsed = createPlanEntrySchema.safeParse(Object.fromEntries(formData));
        if(!parsed.success) return {error: "Invalid input"}

    const today = getToday();

    
    
    const last  = await prisma.planEntry.findFirst({
        where:{userId, date:today},
        orderBy: {position: "desc"},
        select: {position: true},

    });
    const position = last ? last.position + 1 : 0;



        await prisma.planEntry.create({
                data:   {userId, 
                        date: today, 
                        text: parsed.data.text, 
                        position },
            });
    revalidatePath("/dashboard");
}

export async function deletePlanEntry(id: string) {

    const userId = await requireUserId();

    const parsed = z.string().min(1).safeParse(id);
    if(!parsed.success) return {error: "Invalid input"}
    
    const result = await prisma.planEntry.deleteMany({
        where: {id,userId},
    });
    if (result.count === 0 ) return {error: "Not found"}

    revalidatePath("/dashboard");

}

export async function togglePlanEntry(id: string, done: boolean){

    const userId = await requireUserId();

    const parsed = z.string().min(1).safeParse(id);
    if(!parsed.success) return {error: "Invalid input"}

    const result = await prisma.planEntry.updateMany({
        where: {id,userId},
        data: {done}
    });
    if (result.count === 0 ) return {error: "Not found"}

    revalidatePath("/dashboard");

}