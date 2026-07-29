import { createHabit } from "@/app/actions/habits";

export default function HabitForm() {

    return (
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
        </form>)
            
}     