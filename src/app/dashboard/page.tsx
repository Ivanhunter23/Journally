import {auth} from "@/auth";
import {signOut} from "@/auth";
import {prisma} from "@/lib/prisma";
import { archiveHabit, logHabit, } from "../actions/habits";
import JournalForm from "@/components/JournalForm";
import HabitForm from "@/components/HabitForm";

export default async function DashboardPage() {
    const session = await auth();
    if (!session?.user?.id) return null;
    const now = new Date();
    const today = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
    const habits = await prisma.habit.findMany({
        include: {logs: {where: {date: today}}}, where: {userId: session.user.id , archivedAt: null,}, orderBy: {createdAt:"asc"}
        
    })

    return (
        <main className ='flex min-h-screen flex-col items-center justify-center gap-4'>
        <p>Signed in as {session?.user?.name ?? session?.user?.email} </p>
        {habits.length === 0 ? (
            <p>No habits yet</p>
        ):(  <ul>
                {habits.map((habit) => (
                    <li key = {habit.id} className="flex items-center gap-2">
                        {habit.name}
                        {habit.logs.length > 0 ? `(${habit.logs[0].value})` : "Not logged"}
                        <form action={async () => {
                            "use server";
                            await archiveHabit(habit.id);

                        }}>
                            <button type="submit">Archive</button>
                        </form>
                        <form action={async (formData) =>{
                            "use server";
                            await logHabit(formData);
                        }}>
                            <input type ="hidden" name = "habitId" value={habit.id} />
                            {habit.type === "QUANTITATIVE" ? <input type="number" name="value" /> : null}
                            <button type="submit">Log</button>

                        
                            
                            
                        </form>
                    </li>
                ))}
            </ul>)}

        <HabitForm/>
        <JournalForm/>
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
