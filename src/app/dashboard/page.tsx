import {auth} from "@/auth";
import {signOut} from "@/auth";

export default async function DashboardPage() {
    const session = await auth();

    return (
        <main className ='flex min-h-screen flex-col items-center justify-center gap-4'>
        <p>Signed in as {session?.user?.name ?? session?.user?.email} </p>

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
