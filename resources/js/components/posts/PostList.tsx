import { Link, router } from '@inertiajs/react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useCallback, useEffect, useRef, useState } from 'react';
import PostSkeleton from '@/components/ui/postSkeleton';
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

    const parentRef = useRef<HTMLDivElement | null>(null);
    const isFetchingRef = useRef(false);

    const [isLoading, setIsLoading] = useState(false);
    const [allPosts, setAllPosts] = useState<Post[]>(posts.data);
    const [nextUrl, setNextUrl] = useState(posts.links.next);

    const fetchPosts = useCallback(() => {
        if (!nextUrl || isFetchingRef.current) {
            return;
        }

        isFetchingRef.current = true;
        setIsLoading(true);
        router.get(
            nextUrl,
            {},
            {
                preserveState: true,
                preserveScroll: true,
                onSuccess: (page) => {
                    const nextPosts = (page.props as any).posts;
                    setAllPosts((prev) => [
                        ...prev,
                        ...nextPosts.data.filter(
                            (post: Post) =>
                                !prev.some(
                                    (existingPost) =>
                                        existingPost.id === post.id,
                                ),
                        ),
                    ]);
                    setNextUrl(nextPosts.links.next);
                },
                onFinish: () => {
                    isFetchingRef.current = false;
                    setIsLoading(false);
                },
            },
        );
    }, [nextUrl]);

    // TanStack Virtual exposes imperative methods that React Compiler cannot memoize safely.
    // eslint-disable-next-line react-hooks/incompatible-library
    const virtualizer = useVirtualizer({
        count: allPosts.length + (nextUrl ? 1 : 0),
        getScrollElement: () => parentRef.current,
        estimateSize: () => 440,
        getItemKey: (index) => allPosts[index]?.id ?? index,
        overscan: 2,
    });

    const virtualItems = virtualizer.getVirtualItems();

    useEffect(() => {
        const lastItem = virtualItems.at(-1);

        if (lastItem && lastItem.index >= allPosts.length - 1) {
            fetchPosts();
        }
    }, [allPosts.length, fetchPosts, virtualItems]);

    if (!postList || postList.length === 0) {
        return (
            <div className="mt-30 flex justify-center text-4xl text-gray-500">
                No posts yet...
            </div>
        );
    }

    return (
        <div
            ref={parentRef}
            className="relative mx-auto mt-8 flex h-[calc(100vh-220px)] min-h-120 w-full flex-col items-center overflow-auto shadow-xl"
        >
            <div
                className="relative w-80 md:w-100 lg:w-200"
                style={{
                    height: virtualizer.getTotalSize(),
                }}
            >
                {virtualItems.map((virtualItem) => {
                    const post = allPosts[virtualItem.index];
                    const isLoaderRow = virtualItem.index > allPosts.length - 1;

                    if (isLoaderRow) {
                        return (
                            <div
                                key={virtualItem.key}
                                data-index={virtualItem.index}
                                ref={virtualizer.measureElement}
                                className="absolute top-0 left-0 w-full py-4"
                                style={{
                                    transform: `translateY(${virtualItem.start}px)`,
                                }}
                            >
                                <div className="flex flex-col items-center gap-8">
                                    <PostSkeleton />
                                    <PostSkeleton />
                                    <PostSkeleton />
                                </div>
                            </div>
                        );
                    }

                    return (
                        <div
                            key={virtualItem.key}
                            data-index={virtualItem.index}
                            ref={virtualizer.measureElement}
                            className="absolute top-0 left-0 w-full py-4"
                            style={{
                                transform: `translateY(${virtualItem.start}px)`,
                            }}
                        >
                            <Card className="relative w-full overflow-hidden bg-[#202020] p-0">
                                {post.image && (
                                    <img
                                        src={`/storage/${post.image}`}
                                        className="h-40 w-full rounded-lg border border-zinc-800 object-cover lg:h-75"
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
            {isLoading && <span className="sr-only">Loading posts</span>}
        </div>
    );
}
