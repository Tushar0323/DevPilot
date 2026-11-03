import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { LanguageIcon, getLanguageLabel } from "@/components/icons/language-icon";
import { cn } from "@/lib/utils";
export function LanguageBadge({ language, className, showLabel = true, iconSize = "md", }) {
    return (_jsxs("div", { className: cn("inline-flex items-center gap-2", className), children: [_jsx(LanguageIcon, { language: language, size: iconSize }), showLabel && (_jsx("span", { className: "text-xs font-medium text-foreground", children: getLanguageLabel(language) }))] }));
}
