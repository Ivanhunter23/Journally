import {auth} from "@/auth";
import {signOut} from "@/auth";
import {prisma} from "@/lib/prisma";
import { archiveHabit, createHabit, logHabit } from "../actions/habits";
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
        <form
            action={async (formData: FormData) => {
                "use server";
                await createHabit(formData);
            }}
            className="flex flex-col gap-2"
        >
            <input type="text" name="name" placeholder="Habit name" />

            <select name="type">
                <option value="BINARY">Yes/No</option>
                <option value="QUANTITATIVE">Measured</option>

            </select>

            <input type="number" name="targetValue" placeholder="Target" />
            <input type="text" name="unit" placeholder="Unit (e.g. pages" />

            <select name="timeOfDay" >
                <option value="MORNING"></option>
                <option value="EVENING"></option>
            </select>

            <button type="submit">Add habit</button>
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
