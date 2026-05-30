import { useCallback, useEffect, useRef } from 'react';

export function useInfinityScroll(fetchData: () => void, hasMore: boolean) {
    const loadMoreRef = useRef<HTMLDivElement | null>(null);
    const isLoading = useRef(false);

    const handleIntersection = useCallback(
        (entries: IntersectionObserverEntry[]) => {
            const isIntersecting = entries[0]?.isIntersecting;

            if (isIntersecting && hasMore) {
                isLoading.current = true;
                fetchData();
            }
        },
        [fetchData, hasMore],
    );
    useEffect(() => {
        isLoading.current = false;
    }, [hasMore]);

    useEffect(() => {
        const observer = new IntersectionObserver(handleIntersection, {
            threshold: 0.1,
            rootMargin: '200px',
        });

        if (loadMoreRef.current) {
            observer.observe(loadMoreRef.current);
        }

        return () => observer.disconnect();
    }, [handleIntersection]);

    return { loadMoreRef };
}
