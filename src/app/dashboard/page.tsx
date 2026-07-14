import {auth} from "@/auth";
import {signOut} from "@/auth";
import {prisma} from "@/lib/prisma";
import { archiveHabit, createHabit } from "../actions/habits";
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
                    <li key = {habit.id} className="flex items-center gap-2">
                        {habit.name}
                        <form action={async () => {
                            "use server";
                            await archiveHabit(habit.id);

                        }}>
                            <button type="submit">Archive</button>
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
