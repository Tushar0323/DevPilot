import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useRouter } from "@/lib/router";
import { useEffect } from "react";
import { useCurrentUser } from "@/hooks/use-auth";
import { Spinner } from "@/components/ui/spinner";
export function RequireAuth({ children }) {
    const { data: user, isLoading, isError } = useCurrentUser();
    const router = useRouter();
    useEffect(() => {
        if (!isLoading && !user) {
            router.replace("/login");
        }
    }, [isLoading, user, router]);
    if (isLoading) {
        return (_jsx("div", { className: "flex min-h-svh items-center justify-center", children: _jsxs("div", { className: "flex flex-col items-center gap-3 text-muted-foreground", children: [_jsx(Spinner, { className: "size-6" }), _jsx("p", { className: "text-sm", children: "Loading your workspace\u2026" })] }) }));
    }
    if (isError || !user) {
        return null;
    }
    return _jsx(_Fragment, { children: children });
}
