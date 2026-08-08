"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  // useState (not a module-level const) so each user/request gets its own
  // client on the server, but the SAME client is reused across re-renders
  // on the client — this is the official recommended pattern for Next.js
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5, // sane default: 5 min
            refetchOnWindowFocus: false, // avoid surprise refetches burning quota
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}