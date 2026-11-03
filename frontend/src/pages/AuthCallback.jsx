import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRouter } from "@/lib/router";
import { useEffect } from "react";
import { useCurrentUser } from "@/hooks/use-auth";
import { Spinner } from "@/components/ui/spinner";
export default function AuthCallbackPage() {
    const router = useRouter();
    const { data: user, isLoading, isError, isFetched } = useCurrentUser();
    useEffect(() => {
        if (!isFetched || isLoading)
            return;
        if (user) {
            router.replace("/dashboard");
            return;
        }
        router.replace("/login?error=session");
    }, [user, isLoading, isFetched, isError, router]);
    return (_jsxs("div", { className: "flex min-h-svh flex-col items-center justify-center gap-3", children: [_jsx(Spinner, { className: "size-6" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Finishing GitHub sign-in\u2026" })] }));
}
