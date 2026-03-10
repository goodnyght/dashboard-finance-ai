import { useSession } from "../lib/auth";
import { authService } from "../services/auth.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAuth = () => {
    const queryClient = useQueryClient();
    const { data: session, isPending, error } = useSession();

    const loginMutation = useMutation({
        mutationFn: (data: Parameters<typeof authService.signIn.email>[0]) => authService.signIn.email(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["session"] });
        },
    });

    const registerMutation = useMutation({
        mutationFn: (data: Parameters<typeof authService.signUp.email>[0]) => authService.signUp.email(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["session"] });
        },
    });

    const logoutMutation = useMutation({
        mutationFn: () => authService.signOut(),
        onSuccess: () => {
            queryClient.clear();
            window.location.href = "/login";
        },
    });

    return {
        session,
        isPending,
        error,
        login: loginMutation.mutate,
        isLoggingIn: loginMutation.isPending,
        loginError: loginMutation.error,
        register: registerMutation.mutate,
        isRegistering: registerMutation.isPending,
        registerError: registerMutation.error,
        logout: logoutMutation.mutate,
        isLoggingOut: logoutMutation.isPending,
    };
};
