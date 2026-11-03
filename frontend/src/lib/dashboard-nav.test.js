import { describe, expect, it } from "vitest";
import { isDashboardNavActive } from "./dashboard-nav";
describe("dashboard navigation", () => {
    it("matches exact and nested routes according to the item configuration", () => {
        expect(isDashboardNavActive("/dashboard", "/dashboard", true)).toBe(true);
        expect(isDashboardNavActive("/dashboard/chat", "/dashboard", true)).toBe(false);
        expect(isDashboardNavActive("/dashboard/settings/profile", "/dashboard/settings")).toBe(true);
    });
});
