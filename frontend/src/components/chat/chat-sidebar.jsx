import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { formatDistanceToNow } from "date-fns";
import { Plus, RotateCcw } from "lucide-react";
import { IndexStatusBadge } from "@/components/dashboard/repo-status";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useChatSessions, useCreateChatSession, } from "@/hooks/use-chat";
import { useStartIndexing } from "@/hooks/use-repos";
import { cn } from "@/lib/utils";
export function ChatSidebar({ repo, sessionId, onSelectSession, }) {
    const ready = repo.indexStatus === "READY";
    const sessionsQuery = useChatSessions(repo.id, ready);
    const createSession = useCreateChatSession(repo.id);
    const reindex = useStartIndexing();
    return (_jsxs("aside", { className: "flex w-full flex-col border-b md:w-72 md:border-r md:border-b-0", children: [_jsxs("div", { className: "space-y-3 p-4", children: [_jsxs("div", { className: "space-y-1", children: [_jsx("p", { className: "truncate text-sm font-medium", children: repo.fullName }), _jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [_jsx(IndexStatusBadge, { status: repo.indexStatus }), repo.isPrivate && (_jsx("span", { className: "text-xs text-muted-foreground", children: "Private" }))] })] }), _jsxs("div", { className: "flex gap-2", children: [_jsxs(Button, { size: "sm", className: "flex-1", disabled: !ready || createSession.isPending, onClick: () => createSession.mutate("New chat", {
                                    onSuccess: (session) => onSelectSession(session.id),
                                }), children: [_jsx(Plus, { "data-icon": "inline-start" }), "New chat"] }), _jsx(Button, { size: "sm", variant: "outline", disabled: reindex.isPending || repo.indexStatus === "INDEXING", onClick: () => reindex.mutate(repo.id), "aria-label": "Re-index repository", children: _jsx(RotateCcw, {}) })] })] }), _jsx(Separator, {}), _jsx("div", { className: "px-4 py-2 text-xs font-medium text-muted-foreground", children: "Sessions" }), _jsx(ScrollArea, { className: "flex-1", children: _jsxs("div", { className: "space-y-1 px-2 pb-4", children: [!ready && (_jsx("p", { className: "px-2 text-xs text-muted-foreground", children: "Sessions unlock after indexing completes." })), sessionsQuery.isLoading &&
                            Array.from({ length: 3 }).map((_, i) => (_jsx(Skeleton, { className: "h-12 rounded-xl" }, i))), sessionsQuery.data?.map((session) => (_jsxs("button", { type: "button", onClick: () => onSelectSession(session.id), className: cn("w-full rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-muted", sessionId === session.id && "bg-muted"), children: [_jsx("p", { className: "truncate text-sm font-medium", children: session.title }), _jsx("p", { className: "text-xs text-muted-foreground", children: formatDistanceToNow(new Date(session.createdAt), {
                                        addSuffix: true,
                                    }) })] }, session.id))), ready && sessionsQuery.isSuccess && sessionsQuery.data.length === 0 && (_jsx("p", { className: "px-2 text-xs text-muted-foreground", children: "No chats yet. Start one to begin." }))] }) })] }));
}
