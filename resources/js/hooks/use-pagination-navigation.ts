import { router } from '@inertiajs/react';

export function createPageNavigator(
    path: string,
    scroll: boolean,
    search?: string,
) {
    return (page: number) => {
        router.get(
            path,
            { page, ...(search && { search }) },
            { preserveScroll: scroll },
        );
    };
}
