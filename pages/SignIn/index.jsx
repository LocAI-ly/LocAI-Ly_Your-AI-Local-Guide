import { useRouter } from "next/router";
import { supabase } from "@/utils/supabaseClient";

export default function SignIn() {
    const route = useRouter()

    const handleSignIn = async () => {
        const { user, session, error } = await supabase.auth.signInWithOAuth({
            provider: "google",
        });

        if (error) {
            console.error("Error signing in:", error.message);
            return;
        }

        if (session){
            console.log('Signed in as: ', user.email)
            route.push("/");
        }
    }

    return (
        <div>
            <h1>Sign In</h1>
            <button onClick={handleSignIn}>Sign in with Google</button>
        </div>
    )
}