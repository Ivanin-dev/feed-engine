<?php

namespace App\Http\Controllers;

use App\Enums\PaginationEnum;
use App\Models\Post;
use App\Models\User;
use App\Services\PostService;
use App\Services\UserProfileService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function __construct(private UserProfileService $userProfileService, private PostService $postService) {}

    public function index(Request $request)
    {
        $posts = $this->postService->getUserPosts($request->user(), PaginationEnum::PAGE_SIZE->value);
        $stories = $this->postService->getUserStories($request->user(), PaginationEnum::PAGE_SIZE->value);

        return Inertia::render('Profile/MyProfile', [
            'posts' => $posts,
            'stories' => $stories,
        ]);
    }

    public function show(User $id)
    {
        $posts = $this->postService->getUserPosts($id, PaginationEnum::PAGE_SIZE->value);
        $stories = $this->postService->getUserStories($id, PaginationEnum::PAGE_SIZE->value);

        return Inertia::render('Profile/Profile', [
            'user' => $id,
            'posts' => $posts,
            'stories' => $stories,
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate(
            [
                'name' => 'required|string',
                'email' => 'required|email|unique:users,email,'.$request->user()->id,
                'password' => 'nullable|min:8|confirmed|string',
                'headline' => 'string|nullable',
                'description' => 'string|nullable|max:250',
                'avatar' => 'image|max:2048|nullable',
                'banner' => 'image|max:2048|nullable',

            ]
        );

        $this->userProfileService->updateProfile($request, $request->user(), $validated);

        return redirect()->route('profile')->with('success');
    }

    public function destroy(Post $post)
    {
        $post->delete();

        return response()->json();
    }
}
