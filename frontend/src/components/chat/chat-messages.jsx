import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Bot, UserRound } from "lucide-react";
import { useEffect, useRef } from "react";
import { ChatMarkdown } from "@/components/chat/chat-markdown";
import { CitationChips } from "@/components/chat/citation-chips";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bubble, BubbleContent } from "@/components/ui/bubble";
import { Message, MessageAvatar, MessageContent, MessageFooter, MessageGroup, } from "@/components/ui/message";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
export function ChatMessages({ repo, messages, streamText, isLoading, }) {
    const bottomRef = useRef(null);
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, streamText]);
    if (isLoading) {
        return (_jsxs("div", { className: "flex flex-1 flex-col gap-4 p-6", children: [_jsx(Skeleton, { className: "h-16 w-2/3 rounded-3xl" }), _jsx(Skeleton, { className: "ml-auto h-12 w-1/2 rounded-3xl" }), _jsx(Skeleton, { className: "h-24 w-3/4 rounded-3xl" })] }));
    }
    return (_jsx(ScrollArea, { className: "flex-1", children: _jsxs("div", { className: "mx-auto flex w-full max-w-3xl flex-col gap-5 px-4 py-6", children: [messages.length === 0 && !streamText && (_jsxs("div", { className: "rounded-2xl border border-dashed bg-muted/30 px-6 py-10 text-center", children: [_jsx("p", { className: "font-medium", children: "Ask anything about this codebase" }), _jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Try \u201CWhere is authentication handled?\u201D or \u201CExplain the repository indexing flow.\u201D" })] })), _jsxs(MessageGroup, { children: [messages.map((message) => {
                            const isUser = message.role === "USER";
                            return (_jsxs(Message, { align: isUser ? "end" : "start", children: [_jsx(MessageAvatar, { children: _jsx(Avatar, { className: "size-8", children: _jsx(AvatarFallback, { className: cn(isUser
                                                    ? "bg-primary text-primary-foreground"
                                                    : "bg-muted"), children: isUser ? (_jsx(UserRound, { className: "size-4" })) : (_jsx(Bot, { className: "size-4" })) }) }) }), _jsxs(MessageContent, { children: [_jsx(Bubble, { variant: isUser ? "default" : "muted", align: isUser ? "end" : "start", className: cn(!isUser && "max-w-full"), children: _jsx(BubbleContent, { className: cn(!isUser && "w-full max-w-full px-4 py-3"), children: isUser ? (_jsx("span", { className: "whitespace-pre-wrap", children: message.content })) : (_jsx(ChatMarkdown, { content: message.content })) }) }), !isUser && message.citations?.length > 0 && (_jsx(MessageFooter, { children: _jsx(CitationChips, { repo: repo, citations: message.citations }) }))] })] }, message.id));
                        }), streamText && (_jsxs(Message, { align: "start", children: [_jsx(MessageAvatar, { children: _jsx(Avatar, { className: "size-8", children: _jsx(AvatarFallback, { className: "bg-muted", children: _jsx(Bot, { className: "size-4" }) }) }) }), _jsx(MessageContent, { children: _jsx(Bubble, { variant: "muted", align: "start", className: "max-w-full", children: _jsxs(BubbleContent, { className: "w-full max-w-full px-4 py-3", children: [_jsx(ChatMarkdown, { content: streamText, isStreaming: true }), _jsx("span", { className: "ml-0.5 inline-block h-4 w-1.5 animate-pulse rounded-sm bg-foreground/50 align-middle" })] }) }) })] }))] }), _jsx("div", { ref: bottomRef })] }) }));
}
