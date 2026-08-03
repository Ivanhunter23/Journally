"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { createPlanEntrySchema } from "@/lib/validations/plan";
import { revalidatePath } from "next/cache";
import z from "zod";

export async function createPlanEntry(formData: FormData){
    const session = await auth();
        if(!session?.user?.id)
            return {error: "UNAUTHORIZED"}

    const parsed = createPlanEntrySchema.safeParse(Object.fromEntries(formData));
        if(!parsed.success) return {error: "Invalid input"}


    const now = new Date();
    const today = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));

    
    
    const last  = await prisma.planEntry.findFirst({
        where:{ userId: session.user.id, date:today},
        orderBy: {position: "desc"},
        select: {position: true},

    });
    const position = last ? last.position + 1 : 0;



        await prisma.planEntry.create({
                data:   {userId: session.user.id, 
                        date: today, 
                        text: parsed.data.text, 
                        position: position },
            });
    revalidatePath("/dashboard");
}

export async function deletePlanEntry(id: string) {

     const session = await auth();
        if(!session?.user?.id)
            return {error: "UNAUTHORIZED"}

    

    const parsed = z.string().min(1).safeParse(id);
    if(!parsed.success) return {error: "Invalid input"}

    const result = await prisma.planEntry.deleteMany({
        where: {id, userId:session.user.id},
    });
    if (result.count === 0 ) return {error: "Not found"}

    revalidatePath("/dashboard");

}

export async function togglePlanEntry(id: string, done: boolean){

       const session = await auth();
        if(!session?.user?.id)
            return {error: "UNAUTHORIZED"}

    
    const parsed = z.string().min(1).safeParse(id);
    if(!parsed.success) return {error: "Invalid input"}

    const result = await prisma.planEntry.updateMany({
        where: {id, userId:session.user.id},
        data: {done}
    });
    if (result.count === 0 ) return {error: "Not found"}

    revalidatePath("/dashboard");

}