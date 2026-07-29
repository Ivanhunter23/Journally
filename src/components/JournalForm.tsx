import { logJournal } from "@/app/actions/journal";

export default function JournalForm() { 

        return (<form
            action={async (formData: FormData) => {
                "use server";
                await logJournal(formData);
            }}
            className="flex flex-col gap-2"
            >

                <textarea name="wentWell" placeholder="What went well?"></textarea>


                <textarea name="improve" placeholder="What needs improvement?"></textarea>


                <textarea name="gratitude" placeholder="What are you grateful for today?"></textarea>


                <textarea name="freeText" placeholder="Type something..."></textarea>



                <button type="submit">Add journal entry</button>
    </form>) 

}