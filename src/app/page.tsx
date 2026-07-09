import {signIn} from "@/auth"

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center gap-4">
            <h1 className="text-2xl font-semibold">Journally</h1>
ioi
            <form
                action={async () => {
                    "use server";
                    await signIn("github");
                }}
                >
                <button type ="submit" className="rounded bg-black px-4 py-2 text-white">
                    Sign in with GitHub
                </button>
                </form>
        </main>
    );
}