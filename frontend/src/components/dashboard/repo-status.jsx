import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
export function indexStatusLabel(status) {
    switch (status) {
        case "READY":
            return "Ready";
        case "INDEXING":
            return "Indexing";
        case "FAILED":
            return "Failed";
        default:
            return "Not indexed";
    }
}
export function IndexStatusBadge({ status, className, }) {
    const variant = status === "READY"
        ? "default"
        : status === "FAILED"
            ? "destructive"
            : status === "INDEXING"
                ? "secondary"
                : "outline";
    return (_jsxs(Badge, { variant: variant, className: cn(className), children: [status === "INDEXING" && (_jsx("span", { className: "mr-1 size-1.5 animate-pulse rounded-full bg-current" })), indexStatusLabel(status)] }));
}
export function languageColor(language) {
    const map = {
        TypeScript: "bg-sky-500",
        JavaScript: "bg-amber-400",
        Java: "bg-orange-500",
        Python: "bg-emerald-500",
        Go: "bg-cyan-500",
        Rust: "bg-orange-700",
        Kotlin: "bg-violet-500",
    };
    return map[language ?? ""] ?? "bg-muted-foreground";
}
export function RepoMeta({ repo }) {
    return (_jsxs("div", { className: "flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground", children: [repo.language && (_jsxs("span", { className: "inline-flex items-center gap-1.5", children: [_jsx("span", { className: cn("size-2 rounded-full", languageColor(repo.language)) }), repo.language] })), _jsx("span", { children: repo.defaultBranch }), repo.chunkCount > 0 && _jsxs("span", { children: [repo.chunkCount.toLocaleString(), " chunks"] })] }));
}
