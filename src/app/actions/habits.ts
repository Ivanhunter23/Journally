"use server";
import {auth} from "@/auth";
import {prisma} from "@/lib/prisma";
import { createHabitSchema,logHabitSchema } from "@/lib/validations/habit";
import {revalidatePath} from "next/cache";
import z from "zod";
export async function createHabit(formData: FormData){
    const session = await auth();
    if(!session?.user?.id)
        return {error: "UNAUTHORIZED"}

    const parsed = createHabitSchema.safeParse(Object.fromEntries(formData));
    if(!parsed.success) return {error: "Invalid input"}
    await prisma.habit.create({data: {...parsed.data, userId:session.user.id}});
    revalidatePath("/dashboard");
       
}
export async function archiveHabit(habitId: string){
    const session = await auth();
    if(!session?.user?.id)
        return {error: "UNAUTHORIZED"}

    const parsed = z.string().min(1).safeParse(habitId)
    if(!parsed.success) return {error: "Invalid input"}

    const result = await prisma.habit.updateMany({where: {id: habitId, userId:session.user.id}, data: {archivedAt:new Date()}})

    if (result.count === 0 ) return {error: "Not found"};

    revalidatePath("/dashboard");

}

export async function logHabit (formData: FormData){
    const session = await auth();
    if(!session?.user?.id)
        return {error: "UNAUTHORIZED"}

    const now = new Date();
    const today = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));


    const parsed = logHabitSchema.safeParse(Object.fromEntries(formData));
    if(!parsed.success) return {error: "Invalid input"}
    
    
    
    const habit = await prisma.habit.findFirst({where: {id: parsed.data.habitId, userId:session.user.id}})
    if (!habit) return {error: "Not found"};

    await prisma.habitLog.upsert({
        where: {habitId_date: {habitId: parsed.data.habitId, date: today}},
        create: {habitId: parsed.data.habitId, date: today, value: parsed.data.value },
        update: {value: {increment: parsed.data.value }},
    });

    revalidatePath("/dashboard");
}