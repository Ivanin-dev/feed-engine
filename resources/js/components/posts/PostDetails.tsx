import { useForm } from '@inertiajs/react';
import { SendHorizonal } from 'lucide-react';
import type { SyntheticEvent } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardTitle } from '@/components/ui/card';
import type { Post } from '@/types';

interface PostProps {
    post: Post;
}
interface CommentForm {
    text: string;
}
export default function PostDetails({ post }: PostProps) {
    const {
        data,
        setData,
        post: submitComment,
        reset,
        processing,
    } = useForm<CommentForm>({
        text: '',
    });
    const comments = post.comments?.data ?? [];

    const handleCommentSent = (e: SyntheticEvent) => {
        e.preventDefault();
        submitComment(window.route('comment.store', post.id), {
            onSuccess: () => reset('text'),
        });
    };

    return (
        <section className="flex justify-center">
            <Card
                key={post.id}
                className="relative w-200 overflow-auto border-zinc-800 bg-[#202020] p-0"
            >
                {post.image && (
                    <img
                        src={`/storage/${post.image}`}
                        className="h-75 w-full rounded-lg border border-zinc-800 object-cover"
                        alt="Post content"
                    />
                )}
                <div className="p-4">
                    <CardTitle className="text-zinc-100">
                        {post.title}
                    </CardTitle>
                    <p className="mt-2 text-zinc-400">{post.text}</p>
                    <div className="flex w-full justify-between">
                        <span className="pt-2 text-sm text-[#828282]">
                            {post.created_at}
                        </span>
                    </div>
                </div>

                <div className="border-t border-zinc-800 p-4">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-sm font-medium text-zinc-100">
                            Discussion
                        </h2>
                        <span className="text-sm text-[#828282]">
                            {comments.length} comments
                        </span>
                    </div>

                    <div className="flex gap-3">
                        <Avatar className="size-9 border border-zinc-800">
                            <AvatarFallback className="bg-zinc-800 text-xs text-zinc-300">
                                You
                            </AvatarFallback>
                        </Avatar>
                        <form
                            onSubmit={handleCommentSent}
                            className="flex-1 rounded-md border border-zinc-800 bg-zinc-900/50 p-3"
                        >
                            <textarea
                                value={data.text}
                                onChange={(e) =>
                                    setData('text', e.target.value)
                                }
                                placeholder="Write a comment"
                                rows={3}
                                className="w-full resize-none bg-transparent text-sm text-zinc-100 outline-none placeholder:text-zinc-500"
                            />
                            <div className="mt-3 flex justify-end">
                                <Button
                                    disabled={processing}
                                    type="submit"
                                    size="sm"
                                    className="bg-[#107EFF] text-white hover:bg-[#107EFF]/90"
                                >
                                    <SendHorizonal className="size-4" />
                                    Send
                                </Button>
                            </div>
                        </form>
                    </div>

                    <div className="mt-5 space-y-4">
                        {comments.length > 0 ? (
                            comments.map((comment) => (
                                <div
                                    key={comment.id}
                                    className="flex gap-3 border-t border-zinc-800 pt-4"
                                >
                                    <Avatar className="size-9 border border-zinc-800">
                                        {comment.user?.avatar && (
                                            <AvatarImage
                                                src={`/storage/${comment.user.avatar}`}
                                                alt={comment.user.name}
                                            />
                                        )}
                                        <AvatarFallback className="bg-zinc-800 text-xs text-zinc-300">
                                            {comment.user?.name?.slice(0, 2) ??
                                                'U'}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="min-w-0 flex-1">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="text-sm font-medium text-zinc-100">
                                                {comment.user?.name ??
                                                    'Unknown user'}
                                            </span>
                                            {comment.created_at && (
                                                <span className="text-xs text-[#828282]">
                                                    {comment.created_at}
                                                </span>
                                            )}
                                        </div>
                                        <p className="mt-1 text-sm text-zinc-400">
                                            {comment.text}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="border-t border-zinc-800 pt-4 text-sm text-zinc-500">
                                No comments yet.
                            </p>
                        )}
                    </div>
                </div>
            </Card>
        </section>
    );
}
