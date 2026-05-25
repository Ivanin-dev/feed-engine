
import CreateStoryModal from '@/components/modals/CreateStoryModal';
import { PostList } from '@/components/posts/PostList';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
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
            <Stories
                stories={stories}
                action={
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button type="button">Add story</Button>
                        </DialogTrigger>
                        <CreateStoryModal></CreateStoryModal>
                    </Dialog>
                }
            />
            <PostComposer />
            <PostList posts={posts} />
        </div>
    );
}
