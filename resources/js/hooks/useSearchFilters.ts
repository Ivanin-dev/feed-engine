import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export function useSearchFilters(
    initialSearch: string | null = '',
    page: number,
    path: string,
) {
    const [search, setSearch] = useState(initialSearch ?? '');

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            router.get(
                path,
                { search, page },
                {
                    preserveScroll: false,
                    preserveState: true,
                    replace: true,
                },
            );
        }, 300);

        return () => clearTimeout(delayDebounce);
    }, [path, search]);

    return { search, setSearch };
}
