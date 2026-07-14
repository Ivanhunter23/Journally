import {signIn} from "@/auth"
import Link from "next/link";
import { auth } from "@/auth";

export default async function Home() {
    const session = await auth();
    if (session?.user){
        return(
        <main className="flex min-h-screen flex-col items-center justify-center gap-4">
            <h1 className="text-2xl font-semibold">Journally</h1>
            <Link href="/dashboard">Go to dashboard</Link>
        </main>
    );
    }
    return (
        <main className="flex min-h-screen flex-col items-center justify-center gap-4">
            <h1 className="text-2xl font-semibold">Journally</h1>
            <form
                action={async () => {
                    "use server";
                    await signIn("github", {redirectTo: "/dashboard"}) ;
                }}
                >
                <button type ="submit" className="rounded bg-black px-4 py-2 text-white">
                    Sign in with GitHub
                </button>
                </form>
        </main>  
    );
    }      

