import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AlertCircle, Loader2, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle, } from "@/components/ui/empty";
import { Progress } from "@/components/ui/progress";
import { getRepoProgress, useStartIndexing } from "@/hooks/use-repos";
export function IndexingState({ repo, status, }) {
    const indexMutation = useStartIndexing();
    const filesProcessed = status?.filesProcessed ?? repo.filesProcessed;
    const filesTotal = status?.filesTotal ?? repo.filesTotal;
    const chunkCount = status?.chunkCount ?? repo.chunkCount;
    const progress = getRepoProgress({ filesProcessed, filesTotal });
    const indexStatus = status?.indexStatus ?? repo.indexStatus;
    const errorMessage = status?.errorMessage ?? repo.errorMessage;
    if (indexStatus === "FAILED") {
        return (_jsxs(Empty, { className: "h-full border-0", children: [_jsxs(EmptyHeader, { children: [_jsx(EmptyMedia, { variant: "icon", children: _jsx(AlertCircle, { className: "text-destructive" }) }), _jsx(EmptyTitle, { children: "Indexing failed" }), _jsx(EmptyDescription, { children: errorMessage || "Something went wrong while indexing this repository." })] }), _jsxs(Button, { onClick: () => indexMutation.mutate(repo.id), disabled: indexMutation.isPending, children: [_jsx(RotateCcw, { "data-icon": "inline-start" }), "Retry indexing"] })] }));
    }
    return (_jsxs(Empty, { className: "h-full border-0", children: [_jsxs(EmptyHeader, { children: [_jsx(EmptyMedia, { variant: "icon", children: _jsx(Loader2, { className: "animate-spin" }) }), _jsxs(EmptyTitle, { children: ["Indexing ", repo.fullName] }), _jsx(EmptyDescription, { children: filesTotal > 0
                            ? `${filesProcessed} of ${filesTotal} files · ${chunkCount} chunks embedded`
                            : "Fetching repository files and preparing embeddings…" })] }), _jsxs("div", { className: "w-full max-w-sm space-y-2", children: [_jsx(Progress, { value: Math.max(progress, filesTotal ? progress : 12) }), _jsx("p", { className: "text-center text-xs text-muted-foreground", children: "You can leave this page open \u2014 chat unlocks when indexing finishes." })] })] }));
}
