import { PostList } from '@/components/posts/PostList';
import type { PaginatedResponse, Post, Story } from '@/types';
import PostComposer from '../../components/posts/PostComposer';
import Stories from '../../components/story/Stories';

interface ListProps {
    posts: PaginatedResponse<Post>;
    stories: PaginatedResponse<Story>;
}
export default function MyProfile({ posts, stories }: ListProps) {
    return (
        <div>
            <Stories stories={stories} />
            <PostComposer />
            <PostList posts={posts} />
        </div>
    );
}
