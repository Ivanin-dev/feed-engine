<?php

namespace App\Services;

use App\Http\Resources\PostResource;
use App\Http\Resources\StoryResource;
use App\Models\Post;
use App\Models\Story;
use App\Models\User;

class PostService
{
    public function getUserPosts(User $user, int $pageSize)
    {
        return PostResource::collection(
            Post::where('user_id', '=', $user->id)
                ->latest()
                ->paginate($pageSize)
        );
    }

    public function getUserStories(User $user, int $pageSize)
    {
        return StoryResource::collection(
            Story::where('user_id', '=', $user->id)
                ->isActive()
                ->latest()
                ->paginate($pageSize)
        );
    }
}
