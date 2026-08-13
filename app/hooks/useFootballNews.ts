import { useQuery } from "@tanstack/react-query";
import type { Article } from "@/types/news";

class NewsFetchError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

interface FootballApiArticle {
  id: number;
  title: string;
  image?: string;
  original_url?: string;
  published_at?: string;
  source?: {
    id?: number;
    main_url?: string;
  };
}

async function fetchFootballNews(): Promise<Article[]> {
  const res = await fetch("/api/news/football");

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

  console.log("FOOTBALL RAW RESPONSE:", raw);

  const articles: FootballApiArticle[] = Array.isArray(raw)
    ? raw
    : Array.isArray(raw?.result)
      ? raw.result
      : [];

  console.log("FOOTBALL ARTICLES:", articles);

  return articles.map((article: FootballApiArticle): Article => ({
    id: String(article.id),
    title: article.title ?? "",
    excerpt: "",
    url: article.original_url ?? "",
    thumbnail: article.image,
    date: article.published_at ?? "",
    source: article.source?.main_url,
  }));
}

export function useFootballNews(enabled = true) {
  return useQuery({
    queryKey: ["news", "football"],
    queryFn: fetchFootballNews,
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