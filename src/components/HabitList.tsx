import { archiveHabit } from "@/app/actions/habits";
import { logHabit } from "@/app/actions/habits";
import { Prisma } from "@/generated/prisma/client";

type HabitWithLogs = Prisma.HabitGetPayload<{
    include: {logs:true};
}>;

export default function HabitList({habits}: {habits:HabitWithLogs[]}) {
    
    return habits.length === 0 ? (
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
            </ul>)
}