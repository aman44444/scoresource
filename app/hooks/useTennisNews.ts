import { useQuery } from "@tanstack/react-query";
import { adaptTennisNews } from "@/utils/tennis.adapter";
import type { Article } from "@/types/news";

class NewsFetchError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function fetchTennisNews(): Promise<Article[]> {
  const res = await fetch("/api/news/tennis");

  if (!res.ok) {
    const body = await res
      .json()
      .catch(() => ({} as { error?: string }));

    throw new NewsFetchError(
      body?.error ?? `Request failed: ${res.status}`,
      res.status
    );
  }

  const raw = await res.json();

  return adaptTennisNews(raw);
}

export function useTennisNews(enabled = true) {
  return useQuery({
    queryKey: ["news", "tennis"],
    queryFn: fetchTennisNews,
    enabled,
    staleTime: 1000 * 60 * 10,

    retry: (failureCount, error) => {
      if (
        error instanceof NewsFetchError &&
        (error.status === 401 || error.status === 402)
      ) {
        return false;
      }

      return failureCount < 1;
    },
  });
}