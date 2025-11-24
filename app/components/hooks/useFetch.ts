import { useState } from "react";

export function useFetch<T>(fetcher: () => Promise<T>, initialData: T) {
    const [data, setData] = useState<T>(initialData);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const run = async () => {
        setLoading(true);
        setError(null);

        try {
            const result = await fetcher();
            setData(result);
        } catch (err) {
            setError('Failed to fetch data');
        } finally {
            setLoading(false);
        }
    } ;

    return { data , loading , error, run}
}