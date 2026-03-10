import { authClient } from "../lib/auth";

export const authService = {
    signIn: authClient.signIn,
    signUp: authClient.signUp,
    signOut: authClient.signOut,
    useSession: authClient.useSession,
    getSession: authClient.getSession,
};
