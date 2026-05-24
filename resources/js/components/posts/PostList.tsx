import { Link } from '@inertiajs/react';
import { Card, CardTitle } from 'resources/js/components/ui/card';
import Pagination from 'resources/js/components/ui/pagination';
import { createPageNavigator } from 'resources/js/hooks/use-pagination-navigation';
import type { Post } from 'resources/js/types';

interface PostListProps {
    posts: {
        data: Post[];
        meta: { total: number; current_page: number; last_page: number };
        links: { next?: string; prev?: string };
    };
}

export function PostList({ posts }: PostListProps) {
    const postList = posts.data;
    const postPages = posts.meta;

    const handlePageChange = createPageNavigator('/profile', true);

    if (!postList || postList.length === 0) {
        return <div>No posts yet...</div>;
    }

    return (
        <div className="mt-8 justify-items-center space-y-8 overflow-auto shadow-xl">
            {postList.map((post) => (
                <Card
                    key={post.id}
                    className="relative w-80 overflow-auto bg-[#202020] p-0 md:w-100 lg:w-200"
                >
                    {post.image && (
                        <img
                            src={`/storage/${post.image}`}
                            className="h-40 w-full rounded-lg border border-zinc-800 object-cover sm:w-30 md:w-100 lg:h-75 lg:w-200"
                            alt="Post content"
                        />
                    )}
                    <div className="p-4">
                        <CardTitle className="text-zinc-100">
                            {post.title}
                        </CardTitle>
                        <p className="mt-2 text-zinc-400">
                            {post.text.slice(0, 300)}
                        </p>
                        <div className="flex w-full justify-between">
                            <span className="pt-2 text-sm text-[#828282]">
                                {post.created_at}
                            </span>
                            {post.text.length > 300 && (
                                <Link
                                    href={`/post/${post.slug}`}
                                    className="text-[#107EFF]"
                                >
                                    Read more
                                </Link>
                            )}
                        </div>
                    </div>
                </Card>
            ))}

            <Pagination
                currentPage={postPages.current_page}
                lastPage={postPages.last_page}
                onPageChange={handlePageChange}
            ></Pagination>
        </div>
    );
}
