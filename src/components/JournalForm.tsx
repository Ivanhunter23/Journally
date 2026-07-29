import { logJournal } from "@/app/actions/journal";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
export default function JournalForm() { 

    return (
         <Card>
            <CardHeader>
                 <CardTitle>{"Today's Journal" }</CardTitle>
           </CardHeader>

            <CardContent>
                <form
                    action={async (formData: FormData) => {
                    "use server";
                        await logJournal(formData);
                        }}
                        className="flex flex-col gap-2"
                    >

                        <Textarea name="wentWell" placeholder="What went well?"/>


                        <Textarea name="improve" placeholder="What needs improvement?"/>


                        <Textarea name="gratitude" placeholder="What are you grateful for today?"/>


                        <Textarea name="freeText" placeholder="Type something..."/>



                        <Button type="submit">Add journal entry</Button>
                    </form>
            </CardContent>
        </Card>)
}