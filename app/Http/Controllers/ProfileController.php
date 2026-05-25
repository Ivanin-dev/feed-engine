<?php

namespace App\Http\Controllers;

use App\Enums\PaginationEnum;
use App\Http\Resources\PostResource;
use App\Http\Resources\StoryResource;
use App\Models\Post;
use App\Models\Story;
use App\Models\User;
use Hash;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function index(Request $request)
    {
        $posts = PostResource::collection(
            Post::where('user_id', '=', $request->user()->id)
                ->latest()
                ->paginate(PaginationEnum::PAGE_SIZE->value)
        );
        $stories = StoryResource::collection(
            Story::where('user_id', '=', $request->user()->id)
                ->isActive()
                ->latest()
                ->cursorPaginate(PaginationEnum::PAGE_SIZE->value)
        );

        return Inertia::render('Profile/MyProfile', [
            'posts' => $posts,
            'stories' => $stories,
        ]);
    }

    public function show(User $id)
    {
        $posts = PostResource::collection(
            Post::where('user_id', '=', $id->id)
                ->latest()
                ->paginate(PaginationEnum::PAGE_SIZE->value)
        );
        $stories = StoryResource::collection(
            Story::where('user_id', '=', $id->id)
                ->isActive()
                ->latest()
                ->paginate(PaginationEnum::PAGE_SIZE->value)
        );

        return Inertia::render('Profile/Profile', [
            'user' => $id,
            'posts' => $posts,
            'stories' => $stories,
        ]);
    }

    public function update(Request $request)
    {
        $credentials = $request->validate(
            [
                'name' => 'required|string', 'email' => 'required|email',
                'password' => 'nullable', 'headline' => 'string|nullable',
                'description' => 'string|nullable|max:250',
                'avatar' => 'image|max:2048|nullable',
                'banner' => 'image|max:2048|nullable',

            ]
        );

        $updateData = collect($credentials)->filter(fn ($value, $key) => ! in_array($key, ['avatar', 'banner', 'password']) || $request->hasFile($key)
            || $request->filled($key));

        foreach (['avatar', 'banner'] as $field) {
            if ($request->hasFile($field)) {
                $updateData[$field] = $request->file($field)->store($field.'s', 'public');
            }
        }

        if ($request->filled('password')) {
            $updateData->put('password', Hash::make($request->password));
        }

        $request->user()->update($updateData->toArray());

        return redirect()->route('profile')->with('success', 'Profile updated successfully.');
    }

    public function destroy(Post $post)
    {
        $post->delete();

        return response()->json();
    }
}
