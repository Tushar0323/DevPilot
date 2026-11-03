import { jsx as _jsx } from "react/jsx-runtime";
import { RequireAuth } from "@/components/providers/require-auth";
import { AppShell } from "@/components/layout/app-shell";
import { OverviewDashboard } from "@/components/dashboard/overview-dashboard";
export default function OverviewPage() {
    return (_jsx(RequireAuth, { children: _jsx(AppShell, { title: "Overview", description: "Workspace stats and recent repository activity", children: _jsx(OverviewDashboard, {}) }) }));
}
