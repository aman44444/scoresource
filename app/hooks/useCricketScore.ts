import { useQuery } from "@tanstack/react-query";
import { fetchCricketMatches } from "@/components/scores/Cricket/cricket.api";

export function useCricketScore(enabled = true) {
  return useQuery({
    queryKey: ["scores", "cricket"],
    queryFn: fetchCricketMatches,
    enabled,

    staleTime: 1000 * 60,

    gcTime: 1000 * 60 * 5,

    retry: 1,
  });
}