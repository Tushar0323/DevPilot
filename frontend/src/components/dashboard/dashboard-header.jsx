import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { RefreshCw, Search } from "lucide-react";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
const visibilityFilters = [
    { value: "all", label: "All" },
    { value: "public", label: "Public" },
    { value: "private", label: "Private" },
];
const statusFilters = [
    { value: "ALL", label: "All" },
    { value: "READY", label: "Ready" },
    { value: "INDEXING", label: "Indexing" },
    { value: "PENDING", label: "New" },
    { value: "FAILED", label: "Failed" },
];
function FilterPill({ active, onClick, children, }) {
    return (_jsx("button", { type: "button", onClick: onClick, className: cn("rounded-full border px-3 py-1 text-xs font-medium transition-colors", active
            ? "border-foreground/20 bg-foreground text-background shadow-sm"
            : "border-dashed border-border bg-background text-muted-foreground hover:border-foreground/20 hover:text-foreground"), children: children }));
}
export function DashboardHeader({ search, onSearchChange, visibility, onVisibilityChange, status, onStatusChange, totalCount, readyCount, onSync, isSyncing, }) {
    return (_jsx("div", { className: "sticky top-0 z-20 border-b bg-background/85 backdrop-blur-xl", children: _jsxs("div", { className: "flex flex-col gap-4 px-4 py-4 md:px-6", children: [_jsxs("div", { className: "flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between", children: [_jsxs("div", { className: "flex min-w-0 items-start gap-3", children: [_jsx(SidebarTrigger, { className: "-ml-1 mt-0.5" }), _jsxs("div", { className: "min-w-0", children: [_jsx("h1", { className: "font-heading text-xl font-semibold tracking-tight", children: "Repositories" }), _jsx("p", { className: "text-sm text-muted-foreground", children: totalCount != null
                                                ? `${totalCount} connected · ${readyCount ?? 0} ready`
                                                : "Sync and index a repo to start chatting" })] })] }), _jsxs("div", { className: "flex flex-col gap-2 sm:flex-row sm:items-center", children: [_jsxs("div", { className: "relative min-w-[220px] flex-1 sm:min-w-[280px]", children: [_jsx(Search, { className: "pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" }), _jsx(Input, { value: search, onChange: (e) => onSearchChange(e.target.value), placeholder: "Search repositories\u2026", className: "border-dashed bg-background pl-9 shadow-sm" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs(Button, { variant: "outline", className: "border-dashed shadow-sm", onClick: onSync, disabled: isSyncing, children: [_jsx(RefreshCw, { "data-icon": "inline-start", className: isSyncing ? "animate-spin" : undefined }), "Sync"] }), _jsx(ModeToggle, {})] })] })] }), _jsx(Separator, { className: "opacity-60" }), _jsxs("div", { className: "flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between", children: [_jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [_jsx("span", { className: "mr-1 text-xs font-medium text-muted-foreground", children: "Visibility" }), visibilityFilters.map((filter) => (_jsx(FilterPill, { active: visibility === filter.value, onClick: () => onVisibilityChange(filter.value), children: filter.label }, filter.value)))] }), _jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [_jsx("span", { className: "mr-1 text-xs font-medium text-muted-foreground", children: "Status" }), statusFilters.map((filter) => (_jsx(FilterPill, { active: status === filter.value, onClick: () => onStatusChange(filter.value), children: filter.label }, filter.value)))] })] })] }) }));
}
