import { jsx as _jsx } from "react/jsx-runtime";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
const QueryProvider = ({ children }) => {
    const [query, setQuery] = React.useState(() => new QueryClient());
    return _jsx(QueryClientProvider, { client: query, children: children });
};
export default QueryProvider;
