import {auth} from "@/auth";
import {signOut} from "@/auth";
import {prisma} from "@/lib/prisma";
import JournalForm from "@/components/JournalForm";
import HabitForm from "@/components/HabitForm";
import HabitList from "@/components/HabitList";
import PlanList from "@/components/PlanList";
import PlanForm from "@/components/PlanForm";
import { getToday } from "@/lib/date";


export default async function DashboardPage() {
    const session = await auth();
    if (!session?.user?.id) return null;

    const today = getToday();

    const habits = await prisma.habit.findMany({
        include: {logs: {where: {date: today}}}, where: {userId: session.user.id , archivedAt: null,}, orderBy: {createdAt:"asc"}
        
    })
    const planEntries = await prisma.planEntry.findMany({
        where: {userId: session.user.id, date: today},
        orderBy: [{position: "asc"}, {createdAt: "asc"}],
    });

    return (
        <main className ='flex min-h-screen flex-col items-center justify-center gap-4'>
        <p>Signed in as {session?.user?.name ?? session?.user?.email} </p>

        <HabitList habits={habits} />
        <HabitForm/>
        <JournalForm/>
        <PlanList entries={planEntries}/>
        <PlanForm/>
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
