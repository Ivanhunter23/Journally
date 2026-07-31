"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { createPlanEntrySchema } from "@/lib/validations/plan";
import { revalidatePath } from "next/cache";

export async function createPlanEntry(formData: FormData){
    const session = await auth();
        if(!session?.user?.id)
            return {error: "UNAUTHORIZED"}

    const parsed = createPlanEntrySchema.safeParse(Object.fromEntries(formData));
        if(!parsed.success) return {error: "Invalid input"}


    const now = new Date();
    const today = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));

    
    
    const count  = await prisma.planEntry.count({
        where:{ userId: session.user.id, date:today},

    });

        await prisma.planEntry.create({
                data:   {userId: session.user.id, 
                        date: today, 
                        text: parsed.data.text, 
                        position: count },
            });
    revalidatePath("/dashboard");
}

export async function deletePlanEntry(id: string) {

     const session = await auth();
        if(!session?.user?.id)
            return {error: "UNAUTHORIZED"}

    

    await prisma.planEntry.deleteMany({
        where: {id, userId:session.user.id},
    });

    revalidatePath("/dashboard");

}

export async function togglePlanEntry(id: string, done: boolean){

       const session = await auth();
        if(!session?.user?.id)
            return {error: "UNAUTHORIZED"}

    

    await prisma.planEntry.updateMany({
        where: {id, userId:session.user.id},
        data: {done}
    });

    revalidatePath("/dashboard");

}