import type { Article } from "@/types/news";

interface FootballNewsItem {
  id: number;
  title: string;
  image?: string;
  original_url: string;
  lang?: string;
  published_at: string;
  source?: {
    id: number;
    main_url: string;
  };
}

interface FootballNewsResponse {
  result?: FootballNewsItem[];
  data?: FootballNewsItem[];
}

export function adaptFootballNews(
  raw: FootballNewsResponse | FootballNewsItem[]
): Article[] {
  console.log("RAW FOOTBALL NEWS:", raw);

  const items = Array.isArray(raw)
    ? raw
    : raw.result ?? raw.data ?? [];

  console.log("FOOTBALL NEWS ITEMS:", items);

  return items.map((article) => ({
    id: String(article.id),
    title: article.title,
    excerpt: "",
    url: article.original_url,
    thumbnail: article.image,
    date: article.published_at,
    source: article.source?.main_url,
  }));
}