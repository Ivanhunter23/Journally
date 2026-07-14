import {auth} from "@/auth";
import {signOut} from "@/auth";
import {prisma} from "@/lib/prisma";
import { createHabit } from "../actions/habits";
export default async function DashboardPage() {
    const session = await auth();
    if (!session?.user?.id) return null;
    const habits = await prisma.habit.findMany({
        where: {userId: session.user.id , archivedAt: null,}, orderBy: {createdAt:"asc"}
    })

    return (
        <main className ='flex min-h-screen flex-col items-center justify-center gap-4'>
        <p>Signed in as {session?.user?.name ?? session?.user?.email} </p>
        {habits.length === 0 ? (
            <p>No habits yet</p>
        ):(  <ul>
                {habits.map((habit) => (
                    <li key = {habit.id}>{habit.name}</li>
                ))}
            </ul>)}
        <form action={createHabit} className = "flex flex-col gap-2">
            <button type="submit"> Add habit </button>
        </form>
        <form
            action={async () => {
                "use server";
                await signOut();
            }}
        >
            
            <button type ="submit">Sign out </button>
            </form>
        </main>
    );
    
    
}
