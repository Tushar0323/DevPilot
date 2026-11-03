import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { AlertCircle, ChevronDown } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Collapsible, CollapsibleContent, CollapsibleTrigger, } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
const SUMMARY_LIMIT = 100;
function getErrorSummary(message) {
    const line = message.split("\n").find((part) => part.trim())?.trim() ?? message;
    if (line.length <= SUMMARY_LIMIT)
        return line;
    return `${line.slice(0, SUMMARY_LIMIT - 1)}…`;
}
export function IndexErrorAlert({ message }) {
    const [open, setOpen] = useState(false);
    const summary = getErrorSummary(message);
    const isExpandable = message.trim().length > summary.length;
    return (_jsxs(Alert, { variant: "destructive", className: "border-dashed border-destructive/30 bg-destructive/5 px-3 py-2.5", children: [_jsx(AlertCircle, { className: "size-4" }), _jsx(AlertTitle, { className: "text-xs font-semibold", children: "Indexing failed" }), _jsx(AlertDescription, { className: "text-xs text-destructive/90", children: !isExpandable ? (_jsx("p", { className: "wrap-break-word leading-relaxed", children: message })) : (_jsxs(Collapsible, { open: open, onOpenChange: setOpen, children: [!open && (_jsx("p", { className: "wrap-break-word leading-relaxed", children: summary })), _jsxs(CollapsibleTrigger, { className: cn("inline-flex items-center gap-1 font-medium text-destructive hover:underline", !open ? "mt-1.5" : "mt-0"), children: [open ? "Hide details" : "Show details", _jsx(ChevronDown, { className: cn("size-3 transition-transform", open && "rotate-180") })] }), _jsx(CollapsibleContent, { className: "mt-2", children: _jsx("div", { className: "max-h-28 overflow-y-auto rounded-md border border-destructive/20 bg-destructive/10 p-2.5", children: _jsx("p", { className: "wrap-break-word whitespace-pre-wrap leading-relaxed", children: message }) }) })] })) })] }));
}
