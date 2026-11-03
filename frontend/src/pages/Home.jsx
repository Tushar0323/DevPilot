import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { ArrowRight, FolderGit2, MessageSquareCode, Sparkles } from "lucide-react";
import { DevPilotIcon } from "@/components/icons/devpilot-icon";
import { BrandMark } from "@/components/layout/app-shell";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getGithubLoginUrl } from "@/lib/api";
export default function HomePage() {
    return (_jsxs("div", { className: "relative min-h-svh overflow-hidden", children: [_jsx("div", { className: "pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(from_var(--primary)_l_c_h/0.12),transparent_55%)]" }), _jsxs("header", { className: "relative z-10 mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-4", children: [_jsx(BrandMark, {}), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(ModeToggle, {}), _jsx(Link, { href: "/login", className: cn(buttonVariants({ variant: "ghost", size: "sm" })), children: "Sign in" })] })] }), _jsxs("main", { className: "relative z-10 mx-auto flex w-full max-w-5xl flex-col gap-16 px-4 py-16 md:py-24", children: [_jsxs("section", { className: "mx-auto max-w-2xl space-y-6 text-center", children: [_jsx("div", { className: "mx-auto flex size-14 items-center justify-center rounded-2xl shadow-sm", children: _jsx(DevPilotIcon, { className: "size-14 rounded-2xl" }) }), _jsxs("div", { className: "space-y-3", children: [_jsx("h1", { className: "font-heading text-4xl font-semibold tracking-tight sm:text-5xl", children: "DevPilot" }), _jsx("p", { className: "text-lg text-muted-foreground text-balance", children: "Connect GitHub, index any repository, and chat with your codebase using retrieval-augmented answers and citations." })] }), _jsxs("div", { className: "flex flex-wrap items-center justify-center gap-3", children: [_jsxs("a", { href: getGithubLoginUrl(), className: cn(buttonVariants({ size: "lg" }), "inline-flex items-center gap-1.5"), children: [_jsx(FolderGit2, { className: "size-4" }), "Continue with GitHub", _jsx(ArrowRight, { className: "size-4" })] }), _jsx(Link, { href: "/login", className: cn(buttonVariants({ variant: "outline", size: "lg" })), children: "See how it works" })] })] }), _jsx("section", { className: "grid gap-4 md:grid-cols-3", children: [
                            {
                                title: "Connect GitHub",
                                body: "OAuth with repo scope for public and private repositories.",
                                icon: FolderGit2,
                            },
                            {
                                title: "Index with RAG",
                                body: "Chunk and embed your code into Postgres + pgvector.",
                                icon: Sparkles,
                            },
                            {
                                title: "Ask anything",
                                body: "Get grounded answers with clickable source citations.",
                                icon: MessageSquareCode,
                            },
                        ].map((item) => (_jsxs("div", { className: "rounded-2xl border bg-card/80 p-5 shadow-xs backdrop-blur", children: [_jsx("div", { className: "mb-4 flex size-10 items-center justify-center rounded-xl bg-muted", children: _jsx(item.icon, { className: "size-5 text-foreground" }) }), _jsx("h2", { className: "font-medium", children: item.title }), _jsx("p", { className: "mt-1.5 text-sm text-muted-foreground", children: item.body })] }, item.title))) })] })] }));
}
