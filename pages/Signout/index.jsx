import { useRouter } from "next/router";
import { supabase } from "@/utils/supabaseClient";

export default function SignOut() {
    const router = useRouter()

    const handleSignOut = async() => {
        const {error} = supabase.auth.signOut()

        if (error) {
            console.error("Error signing in:", error.message);
            return;
        }
        router.push('/SignIn')
    }

    return (
        <div>
            <h1>Sign Out</h1>
            <button onClick={handleSignOut}>Sign Out</button>
        </div>
    )
}