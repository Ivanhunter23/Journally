import { createHabit } from "@/app/actions/habits";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
export default function HabitForm() {

    return (

        <Card>
            <CardHeader>
                <CardTitle>Add habit</CardTitle>
            </CardHeader>

            <CardContent>
                <form
                    action={async (formData: FormData) => {
                        "use server";
                        await createHabit(formData);
                    }}
                    className="flex flex-col gap-2"
                >
                    <Input type="text" name="name" placeholder="Habit name" />

                    <select name="type">
                        <option value="BINARY">Yes/No</option>
                        <option value="QUANTITATIVE">Measured</option>

                    </select>

                    <Input type="number" name="targetValue" placeholder="Target" />
                    <Input type="text" name="unit" placeholder="Unit (e.g. pages)" />

                    <select name="timeOfDay" >
                        <option value="">No preference</option>
                        <option value="MORNING">MORNING</option>
                        <option value="EVENING">EVENING</option>
                    </select>

                    <Button type="submit">Add habit</Button>
                </form>
            </CardContent>
        </Card>)
    }     