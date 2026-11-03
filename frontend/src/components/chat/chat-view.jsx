import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { ChatComposer } from "@/components/chat/chat-composer";
import { ChatMessages } from "@/components/chat/chat-messages";
import { ChatSidebar } from "@/components/chat/chat-sidebar";
import { IndexingState } from "@/components/chat/indexing-state";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useChatMessages, useChatSessions, useCreateChatSession, useStreamChat, } from "@/hooks/use-chat";
import { useIndexStatus, useRepository } from "@/hooks/use-repos";
export function ChatView({ repoId }) {
    const repoQuery = useRepository(repoId);
    const isIndexing = repoQuery.data?.indexStatus === "INDEXING";
    const statusQuery = useIndexStatus(repoId, isIndexing || repoQuery.data?.indexStatus === "PENDING");
    const indexStatus = statusQuery.data?.indexStatus ?? repoQuery.data?.indexStatus;
    const ready = indexStatus === "READY";
    const sessionsQuery = useChatSessions(repoId, ready);
    const createSession = useCreateChatSession(repoId);
    const [selectedSessionId, setSelectedSessionId] = useState(null);
    const autoCreateRef = useRef(false);
    const sessionId = selectedSessionId ?? sessionsQuery.data?.[0]?.id ?? null;
    const messagesQuery = useChatMessages(sessionId);
    const { send, stop, streaming, streamText } = useStreamChat(sessionId);
    useEffect(() => {
        if (!ready || sessionsQuery.isLoading)
            return;
        if (sessionsQuery.data && sessionsQuery.data.length > 0)
            return;
        if (!sessionsQuery.isSuccess ||
            (sessionsQuery.data?.length ?? 0) > 0 ||
            autoCreateRef.current) {
            return;
        }
        autoCreateRef.current = true;
        createSession.mutate(undefined, {
            onSuccess: (session) => setSelectedSessionId(session.id),
            onError: () => {
                autoCreateRef.current = false;
            },
        });
    }, [
        ready,
        sessionsQuery.isLoading,
        sessionsQuery.isSuccess,
        sessionsQuery.data,
        createSession,
    ]);
    if (repoQuery.isLoading) {
        return (_jsx(AppShell, { title: "Loading chat\u2026", children: _jsxs("div", { className: "grid flex-1 gap-4 p-4 md:grid-cols-[18rem_1fr]", children: [_jsx(Skeleton, { className: "min-h-80 rounded-2xl" }), _jsx(Skeleton, { className: "min-h-80 rounded-2xl" })] }) }));
    }
    if (repoQuery.isError || !repoQuery.data) {
        return (_jsx(AppShell, { title: "Repository unavailable", children: _jsxs("div", { className: "flex flex-1 flex-col items-center justify-center gap-3 p-8", children: [_jsx("p", { className: "text-sm text-muted-foreground", children: repoQuery.error?.message ?? "Repository not found" }), _jsx(Button, { render: _jsx(Link, { href: "/dashboard" }), children: "Back to dashboard" })] }) }));
    }
    const repo = repoQuery.data;
    return (_jsx(AppShell, { title: repo.fullName, description: ready
            ? "Ask questions grounded in this repository"
            : "Waiting for indexing to finish", actions: _jsxs(Button, { variant: "outline", size: "sm", render: _jsx(Link, { href: "/dashboard" }), children: [_jsx(ArrowLeft, { "data-icon": "inline-start" }), "Repos"] }), children: _jsxs("div", { className: "flex min-h-0 flex-1 flex-col md:flex-row", children: [_jsx(ChatSidebar, { repo: {
                        ...repo,
                        indexStatus: indexStatus ?? repo.indexStatus,
                        filesProcessed: statusQuery.data?.filesProcessed ?? repo.filesProcessed,
                        filesTotal: statusQuery.data?.filesTotal ?? repo.filesTotal,
                        chunkCount: statusQuery.data?.chunkCount ?? repo.chunkCount,
                        errorMessage: statusQuery.data?.errorMessage ?? repo.errorMessage,
                    }, sessionId: sessionId, onSelectSession: setSelectedSessionId }), _jsx("section", { className: "flex min-h-[70vh] min-w-0 flex-1 flex-col", children: !ready ? (_jsx(IndexingState, { repo: repo, status: statusQuery.data })) : (_jsxs(_Fragment, { children: [_jsx(ChatMessages, { repo: repo, messages: messagesQuery.data ?? [], streamText: streamText, isLoading: messagesQuery.isLoading }), _jsx(ChatComposer, { disabled: !sessionId, streaming: streaming, onSend: send, onStop: stop })] })) })] }) }));
}
