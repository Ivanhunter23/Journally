import { archiveHabit, logHabit } from "@/app/actions/habits";
import { Prisma } from "@/generated/prisma/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
type HabitWithLogs = Prisma.HabitGetPayload<{
    include: {logs:true};
}>;

export default function HabitList({habits}: {habits:HabitWithLogs[]}) {
    return(
        <Card>
            <CardHeader>
                <CardTitle>Habits</CardTitle>
            </CardHeader>

            <CardContent>
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
                                        <Button type="submit">Archive</Button>
                                    </form>
                                    <form action={async (formData) =>{
                                        "use server";
                                        await logHabit(formData);
                                    }}>
                                        <input type="hidden" name = "habitId" value={habit.id} />
                                        {habit.type === "QUANTITATIVE" ? <Input type="number" name="value" /> : null}
                                        <Button type="submit">Log</Button>                                     
                                    </form>
                                </li>
                            ))}
                        </ul>)}
            </CardContent>            
        </Card>)
    }