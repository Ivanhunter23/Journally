import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { createPlanEntry } from "@/app/actions/plan";
export default function PlanForm() { 

    return (
         <Card>
            <CardHeader>
                 <CardTitle>{"Add to plan" }</CardTitle>
           </CardHeader>

            <CardContent>

                <form
                    action={async (formData: FormData) => {
                    "use server";
                        await createPlanEntry(formData);
                        }}
                        className="flex flex-col gap-2"
                    >

                        <Textarea name="text" placeholder="Write your planning here"/>



                        <Button type="submit">Add plan entry</Button>
                    </form>
            </CardContent>
        </Card>)
}