import { SearchInput } from '@/components/ui/search-input';
import { useSearchFilters } from '@/hooks/useSearchFilters';
import type { PaginatedResponse, User } from 'resources/js/types';
import UsersList from '../../components/users/UsersList';

interface UserProps {
    users: PaginatedResponse<User>;
    filters: { search?: string };
}

export default function Index({ users, filters }: UserProps) {
    const { search, setSearch } = useSearchFilters(
        filters?.search ?? '',
        '/users',
    );

    return (
        <>
            <SearchInput value={search} onChange={setSearch} name="search" />
            <UsersList users={users} />
        </>
    );
}
