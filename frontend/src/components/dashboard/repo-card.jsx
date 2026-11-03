import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useRouter } from "@/lib/router";
import { ArrowRight, ExternalLink, GitBranch, Lock, MessageSquare, RotateCcw, Sparkles, } from "lucide-react";
import { IndexErrorAlert } from "@/components/dashboard/index-error-alert";
import { LanguageBadge } from "@/components/dashboard/language-badge";
import { IndexStatusBadge } from "@/components/dashboard/repo-status";
import { LanguageIcon } from "@/components/icons/language-icon";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Spinner } from "@/components/ui/spinner";
import { getRepoProgress, useStartIndexing } from "@/hooks/use-repos";
import { cn } from "@/lib/utils";
export function RepoCard({ repo }) {
    const router = useRouter();
    const indexMutation = useStartIndexing();
    const isIndexing = repo.indexStatus === "INDEXING" || indexMutation.isPending;
    const isFailed = repo.indexStatus === "FAILED";
    const progress = getRepoProgress(repo);
    function openChat() {
        router.push(`/chat/${repo.id}`);
    }
    function handlePrimary() {
        if (repo.indexStatus === "READY") {
            openChat();
            return;
        }
        indexMutation.mutate(repo.id, {
            onSuccess: () => router.push(`/chat/${repo.id}`),
        });
    }
    return (_jsxs("article", { className: cn("group flex flex-col overflow-hidden rounded-2xl border border-dashed bg-card/80 shadow-md shadow-foreground/5 transition-all", isFailed
            ? "border-destructive/30 bg-destructive/2 hover:border-destructive/40"
            : "border-border/80 hover:-translate-y-0.5 hover:border-foreground/15 hover:shadow-lg hover:shadow-foreground/10"), children: [_jsx("div", { className: "border-b border-dashed border-border/70 p-4", children: _jsxs("div", { className: "flex items-start justify-between gap-3", children: [_jsxs("div", { className: "flex min-w-0 items-start gap-3", children: [_jsx(LanguageBadge, { language: repo.language, showLabel: false }), _jsxs("div", { className: "min-w-0", children: [_jsx("p", { className: "truncate text-xs text-muted-foreground", children: repo.owner }), _jsx("h3", { className: "truncate font-medium", children: repo.name })] })] }), _jsx(IndexStatusBadge, { status: repo.indexStatus })] }) }), _jsxs("div", { className: "flex flex-1 flex-col gap-3 p-4", children: [!isFailed && (_jsx("p", { className: "line-clamp-2 min-h-10 text-sm text-muted-foreground", children: repo.description || "No description provided." })), isFailed && repo.description && (_jsx("p", { className: "line-clamp-1 text-sm text-muted-foreground", children: repo.description })), _jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [repo.isPrivate && (_jsxs("span", { className: "inline-flex items-center gap-1 rounded-full border border-dashed px-2 py-0.5 text-xs text-muted-foreground", children: [_jsx(Lock, { className: "size-3" }), "Private"] })), _jsxs("span", { className: "inline-flex items-center gap-1 rounded-full border border-dashed px-2 py-0.5 text-xs text-muted-foreground", children: [_jsx(GitBranch, { className: "size-3" }), repo.defaultBranch] }), repo.language && (_jsxs("span", { className: "inline-flex items-center gap-1.5 rounded-full border border-dashed px-2 py-0.5 text-xs", children: [_jsx(LanguageIcon, { language: repo.language, size: "sm" }), repo.language] })), repo.chunkCount > 0 && (_jsxs("span", { className: cn("rounded-full border border-dashed px-2 py-0.5 text-xs", isFailed
                                    ? "border-destructive/20 text-destructive/80"
                                    : "text-muted-foreground"), children: [repo.chunkCount.toLocaleString(), " chunks", isFailed ? " indexed" : ""] }))] }), isIndexing && (_jsxs("div", { className: "space-y-2 rounded-xl border border-dashed bg-muted/30 p-3", children: [_jsxs("div", { className: "flex items-center justify-between text-xs text-muted-foreground", children: [_jsx("span", { children: "Indexing\u2026" }), _jsxs("span", { children: [repo.filesProcessed, "/", repo.filesTotal || "?"] })] }), _jsx(Progress, { value: progress || 8 })] })), isFailed && repo.errorMessage && (_jsx(IndexErrorAlert, { message: repo.errorMessage }))] }), _jsxs("div", { className: "mt-auto flex items-center justify-between gap-2 border-t border-dashed border-border/70 p-4", children: [repo.htmlUrl ? (_jsxs(Button, { variant: "ghost", size: "sm", render: _jsx("a", { href: repo.htmlUrl, target: "_blank", rel: "noreferrer" }), children: [_jsx(ExternalLink, { "data-icon": "inline-start" }), "GitHub"] })) : (_jsx("span", {})), _jsxs("div", { className: "flex gap-2", children: [repo.indexStatus === "READY" && (_jsxs(Button, { variant: "secondary", size: "sm", onClick: openChat, children: [_jsx(MessageSquare, { "data-icon": "inline-start" }), "Chat"] })), _jsx(Button, { size: "sm", variant: isFailed ? "outline" : "default", className: cn(isFailed && "border-destructive/30 text-destructive hover:bg-destructive/10"), disabled: isIndexing, onClick: handlePrimary, children: isIndexing ? (_jsxs(_Fragment, { children: [_jsx(Spinner, { "data-icon": "inline-start" }), "Indexing"] })) : repo.indexStatus === "READY" ? (_jsxs(_Fragment, { children: ["Open", _jsx(ArrowRight, { "data-icon": "inline-end" })] })) : isFailed ? (_jsxs(_Fragment, { children: [_jsx(RotateCcw, { "data-icon": "inline-start" }), "Retry"] })) : (_jsxs(_Fragment, { children: [_jsx(Sparkles, { "data-icon": "inline-start" }), "Index"] })) })] })] })] }));
}
