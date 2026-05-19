<?php

namespace App\Http\Controllers;

use App\Enums\PaginationEnum;
use App\Http\Requests\PostRequest;
use App\Http\Resources\PostResource;
use App\Models\Post;
use Inertia\Inertia;
use Inertia\Response;

class PostsController extends Controller
{
    public function index()
    {
        $posts = Post::query()->latest()->paginate(PaginationEnum::PAGE_SIZE->value);

        return Inertia::render('Home/Index', ['posts' => PostResource::collection($posts)]);
    }

    public function view(Post $post): Response
    {

        $post->load(['user', 'comments.user']);

        return Inertia::render('Posts/Show', [
            'post' => new PostResource($post)->resolve(),
        ]);
    }

    public function store(PostRequest $request)
    {
        $createData = collect($request->validated())
            ->filter(fn($val, $key) => $key !== 'image' || $request->hasFile($key));

        if ($request->hasFile('image')) {
            $createData['image'] = $request->file('image')->store('images', 'public');
        }
        $request->user()->posts()->create($createData->toArray());

        return redirect()->back();
    }
}
