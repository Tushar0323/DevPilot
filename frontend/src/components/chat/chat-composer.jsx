import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { SendHorizontal, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Kbd } from "@/components/ui/kbd";
import { Spinner } from "@/components/ui/spinner";
export function ChatComposer({ disabled, streaming, onSend, onStop, }) {
    const [value, setValue] = useState("");
    async function submit() {
        const content = value.trim();
        if (!content || disabled || streaming)
            return;
        setValue("");
        await onSend(content);
    }
    return (_jsx("div", { className: "border-t bg-background/80 p-4 backdrop-blur", children: _jsxs("div", { className: "mx-auto max-w-3xl space-y-2", children: [_jsxs("div", { className: "flex items-end gap-2 rounded-2xl border bg-card p-2 shadow-xs", children: [_jsx(Textarea, { value: value, onChange: (e) => setValue(e.target.value), placeholder: "Ask about architecture, files, flows\u2026", disabled: disabled, className: "min-h-12 flex-1 border-0 bg-transparent px-3 py-2 shadow-none focus-visible:ring-0", onKeyDown: (e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    void submit();
                                }
                            } }), streaming ? (_jsx(Button, { size: "icon-lg", variant: "secondary", onClick: onStop, "aria-label": "Stop generating", children: _jsx(Square, { className: "size-4" }) })) : (_jsx(Button, { size: "icon-lg", disabled: disabled || !value.trim(), onClick: () => void submit(), "aria-label": "Send message", children: disabled ? _jsx(Spinner, {}) : _jsx(SendHorizontal, {}) }))] }), _jsxs("p", { className: "px-1 text-xs text-muted-foreground", children: ["Press ", _jsx(Kbd, { children: "Enter" }), " to send \u00B7 ", _jsx(Kbd, { children: "Shift" }), " + ", _jsx(Kbd, { children: "Enter" }), " ", "for a new line"] })] }) }));
}
