import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { PlanEntry } from "@/generated/prisma/client";
import { deletePlanEntry, togglePlanEntry } from "@/app/actions/plan";

export default function PlanList({entries}: {entries: PlanEntry[]}) { 

    return (
         <Card>
            <CardHeader>
                 <CardTitle>{"Today's plan" }</CardTitle>
           </CardHeader>

            <CardContent>

                {entries.length === 0 ? (
                    <p>No plan entries yet</p>
                    ):(  <ul>
                            {entries.map((entry) => (
                                <li key = {entry.id} className="flex items-center gap-2">
                                    {entry.text}
                                    <form action={async () => {
                                        "use server";
                                        await togglePlanEntry(entry.id, !entry.done);
                                    }}>
                                        <Button type="submit">{entry.done ? "Undo" : "Done"}  </Button>
                                    </form>

                                    <form action={async () => {
                                        "use server";
                                        await deletePlanEntry(entry.id);
                                    }}>
                                        <Button type="submit">Delete</Button>
                                    </form>
                                        
                
                                </li>
                            ))}
                        </ul>)}  
            </CardContent>
        </Card>
    )
}