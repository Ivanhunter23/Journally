"use server";
import {auth} from "@/auth";
import {prisma} from "@/lib/prisma";
import { createHabitSchema } from "@/lib/validations/habit";
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