import { Link, router } from '@inertiajs/react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef, useState } from 'react';
import PostSkeleton from '@/components/ui/postSkeleton';
import { useInfinityScroll } from '@/hooks/use-infinityScroll';
import { Card, CardTitle } from 'resources/js/components/ui/card';
import type { Post } from 'resources/js/types';

interface PostListProps {
    posts: {
        data: Post[];
        meta: { total: number; current_page: number; last_page: number };
        links: { next?: string; prev?: string };
    };
    search?: string;
}

export function PostList({ posts }: PostListProps) {
    const postList = posts.data;

    const containerRef = useRef<HTMLDivElement>(null);

    const [isLoading, setIsLoading] = useState(false);
    const [allPosts, setAllPosts] = useState<Post[]>(posts.data);

    const fetchPosts = async () => {
        if (!posts.links.next) {
            return;
        }

        setIsLoading(true);
        router.get(
            posts.links.next,
            {},
            {
                preserveState: true,
                preserveScroll: true,
                onSuccess: (page) => {
                    setAllPosts((prev) => [
                        ...prev,
                        ...(page.props as any).posts.data,
                    ]);
                },
                onFinish:() => setIsLoading(false),
            },
        );
    };

    const {loadMoreRef } = useInfinityScroll(fetchPosts, !!posts.links.next);

    const virtualizer = useVirtualizer({
        count: allPosts.length,
        getScrollElement: () => containerRef.current,
        estimateSize: () => 300,
        overscan: 5,
    });

    if (!postList || postList.length === 0) {
        return (
            <div className="mt-30 flex justify-center text-4xl text-gray-500">
                No posts yet...
            </div>
        );
    }

    return (
        <div
            ref={containerRef}
            className="mt-8 flex-col justify-items-center overflow-auto shadow-xl"
        >
            <div
                className="max-w-200 "
                style={{
                    height: virtualizer.getTotalSize(),
                    position: 'relative',
                }}
            >
                {virtualizer.getVirtualItems().map((virtualItem) => {
                    const post = allPosts[virtualItem.index];

                    return (
                        <div
                            key={post.id}
                            data-index={virtualItem.index}
                            ref={virtualizer.measureElement}
                            style={{
                                position: 'absolute',
                                transform: `translateX(-50%) translateY(${virtualItem.start}px)`,
                            }}
                        >
                            <Card
                                key={post.id}
                                className="relative w-80 overflow-auto  my-4 bg-[#202020] p-0 md:w-100 lg:w-200"
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
                        </div>
                    );
                })}
            </div>
            {isLoading && (
                <div className="mt-8 flex flex-col items-center gap-8">
                    <PostSkeleton />
                    <PostSkeleton />
                    <PostSkeleton />
                </div>
            )}
            <div ref={loadMoreRef} className="h-4 bg-red-500" />
        </div>
    );
}
