import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Link } from "react-router-dom";
import { useRouter, useSearchParams } from "@/lib/router";
import { Suspense, useEffect } from "react";
import { AlertCircle } from "lucide-react";
import { GitHubIcon } from "@/components/icons/github-icon";
import { BrandMark } from "@/components/layout/app-shell";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { getGithubLoginUrl } from '@/lib/api';
import { useCurrentUser } from '@/hooks/use-auth';
function LoginLoading() {
    return (_jsx("div", { className: "flex min-h-svh items-center justify-center", children: _jsx(Spinner, { className: "size-8" }) }));
}
const LoginContent = () => {
    const params = useSearchParams();
    const router = useRouter();
    const error = params.get("error");
    const next = params.get("next") || "/dashboard";
    const { data: user, isLoading } = useCurrentUser();
    useEffect(() => {
        if (!isLoading && user) {
            router.replace(next.startsWith("/") ? next : "/dashboard");
        }
    }, [user, isLoading, next, router]);
    return (_jsxs("div", { className: "relative flex min-h-svh flex-col overflow-hidden bg-background", children: [_jsx("div", { className: "pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(from_var(--primary)_l_c_h/0.1),transparent_55%)]" }), _jsxs("header", { className: "relative z-10 flex h-14 items-center justify-between px-4", children: [_jsx(Link, { href: "/", children: _jsx(BrandMark, {}) }), _jsx(ModeToggle, {})] }), _jsx("main", { className: "relative z-10 flex flex-1 items-center justify-center px-4 py-10", children: _jsxs(Card, { className: "w-full max-w-sm border-border/70 bg-card/90 shadow-lg shadow-foreground/5 backdrop-blur-xl", children: [_jsxs(CardHeader, { className: "space-y-4 text-center", children: [_jsx("div", { className: "mx-auto flex size-12 items-center justify-center rounded-2xl bg-foreground text-background", children: _jsx(GitHubIcon, { className: "size-6" }) }), _jsxs("div", { className: "space-y-1", children: [_jsx(CardTitle, { className: "text-xl", children: "Sign in" }), _jsx(CardDescription, { children: "Connect GitHub to chat with your repositories." })] })] }), _jsxs(CardContent, { className: "space-y-4", children: [error && (_jsxs(Alert, { variant: "destructive", children: [_jsx(AlertCircle, {}), _jsx(AlertTitle, { children: "Sign-in failed" }), _jsx(AlertDescription, { children: "Please try again." })] })), _jsxs("a", { href: getGithubLoginUrl(), className: cn(buttonVariants({ size: "lg" }), "inline-flex w-full items-center justify-center gap-2 bg-foreground text-background hover:bg-foreground/90"), children: [_jsx(GitHubIcon, { className: "size-5" }), "Continue with GitHub"] })] })] }) })] }));
};
export default function LoginPage() {
    return (_jsx(Suspense, { fallback: _jsx(LoginLoading, {}), children: _jsx(LoginContent, {}) }));
}
