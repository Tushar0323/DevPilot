import { jsx as _jsx } from "react/jsx-runtime";
import { RequireAuth } from "@/components/providers/require-auth";
import { AppShell } from "@/components/layout/app-shell";
import { SettingsDashboard } from "@/components/dashboard/settings-dashboard";
export default function SettingsPage() {
    return (_jsx(RequireAuth, { children: _jsx(AppShell, { title: "Settings", description: "Profile, appearance, and account preferences", children: _jsx(SettingsDashboard, {}) }) }));
}
