import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useState } from "react";
import { FolderGit2 } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { RepoCard } from "@/components/dashboard/repo-card";
import { Button } from "@/components/ui/button";
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle, } from "@/components/ui/empty";
import { Skeleton } from "@/components/ui/skeleton";
import { useRefreshRepos, useRepos } from "@/hooks/use-repos";
export function RepoDashboard() {
    const reposQuery = useRepos();
    const refresh = useRefreshRepos();
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("ALL");
    const [visibility, setVisibility] = useState("all");
    const filtered = useMemo(() => {
        const list = reposQuery.data ?? [];
        const q = search.trim().toLowerCase();
        return list.filter((repo) => {
            if (status !== "ALL" && repo.indexStatus !== status)
                return false;
            if (visibility === "private" && !repo.isPrivate)
                return false;
            if (visibility === "public" && repo.isPrivate)
                return false;
            if (!q)
                return true;
            return (repo.fullName.toLowerCase().includes(q) ||
                (repo.description ?? "").toLowerCase().includes(q) ||
                (repo.language ?? "").toLowerCase().includes(q));
        });
    }, [reposQuery.data, search, status, visibility]);
    const readyCount = reposQuery.data?.filter((r) => r.indexStatus === "READY").length ?? 0;
    return (_jsxs("div", { className: "flex min-h-full flex-col", children: [_jsx(DashboardHeader, { search: search, onSearchChange: setSearch, visibility: visibility, onVisibilityChange: setVisibility, status: status, onStatusChange: setStatus, totalCount: reposQuery.data?.length, readyCount: readyCount, onSync: () => refresh.mutate(), isSyncing: refresh.isPending || reposQuery.isFetching }), _jsxs("div", { className: "flex flex-1 flex-col gap-4 p-4 md:p-6", children: [reposQuery.isLoading && (_jsx("div", { className: "grid gap-4 md:grid-cols-2 xl:grid-cols-3", children: Array.from({ length: 6 }).map((_, i) => (_jsx(Skeleton, { className: "h-64 rounded-2xl" }, i))) })), reposQuery.isError && (_jsxs(Empty, { className: "border border-dashed", children: [_jsxs(EmptyHeader, { children: [_jsx(EmptyMedia, { variant: "icon", children: _jsx(FolderGit2, {}) }), _jsx(EmptyTitle, { children: "Couldn\u2019t load repositories" }), _jsx(EmptyDescription, { children: reposQuery.error.message })] }), _jsx(Button, { onClick: () => void reposQuery.refetch(), children: "Try again" })] })), reposQuery.isSuccess && filtered.length === 0 && (_jsx(Empty, { className: "border border-dashed", children: _jsxs(EmptyHeader, { children: [_jsx(EmptyMedia, { variant: "icon", children: _jsx(FolderGit2, {}) }), _jsx(EmptyTitle, { children: "No repositories match" }), _jsx(EmptyDescription, { children: "Try clearing filters or syncing again." })] }) })), reposQuery.isSuccess && filtered.length > 0 && (_jsx("div", { className: "grid gap-4 md:grid-cols-2 xl:grid-cols-3", children: filtered.map((repo) => (_jsx(RepoCard, { repo: repo }, repo.id))) }))] })] }));
}
