import { PostList } from '@/components/posts/PostList';
import { SearchInput } from '@/components/ui/search-input';
import { useSearchFilters } from '@/hooks/useSearchFilters';
import type { PaginatedResponse, Post } from '@/types';
interface ListProps {
    posts: PaginatedResponse<Post>;
    filters: { search?: string };
}
export default function Index({ posts, filters }: ListProps) {
    const { search, setSearch } = useSearchFilters(filters.search ?? '', '/');

    return (
        <>
            <SearchInput name="search" onChange={setSearch} value={search} />
            <PostList posts={posts} />
        </>
    );
}
