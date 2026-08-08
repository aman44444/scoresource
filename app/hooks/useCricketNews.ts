// app/hooks/useCricketNews.ts
import { useQuery } from "@tanstack/react-query";
import { adaptCricbuzzNews, type Article } from "../utils/cricket.adapter";

class NewsFetchError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function fetchCricketNews(): Promise<Article[]> {
  const res = await fetch("/api/news/cricket");

  if (!res.ok) {
    const body = await res.json().catch(() => ({} as { error?: string }));
    throw new NewsFetchError(
      body?.error ?? `Request failed: ${res.status}`,
      res.status
    );
  }

  const raw = await res.json();
  return adaptCricbuzzNews(raw);
}

export function useCricketNews(enabled: boolean = true) {
  return useQuery({
    queryKey: ["news", "cricket"],
    queryFn: fetchCricketNews,
    enabled,
    staleTime: 1000 * 60 * 10,
    retry: (failureCount, error) => {
      if (error instanceof NewsFetchError && error.status === 402) return false;
      return failureCount < 1;
    },
  });
}