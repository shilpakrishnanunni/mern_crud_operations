import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import App from "./App.tsx";
import "./index.css";

const root = createRoot(document.getElementById("root")!);
const queryClient = new QueryClient();

root.render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    </StrictMode>
);
