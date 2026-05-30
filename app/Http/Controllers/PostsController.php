<?php

namespace App\Http\Controllers;

use App\Enums\PaginationEnum;
use App\Http\Requests\PostRequest;
use App\Http\Resources\PostResource;
use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\Format;
use Intervention\Image\ImageManager;

class PostsController extends Controller
{
    public function index(Request $request)
    {
        $posts = Post::query()
            ->when($request->input('search'), function ($query, $search) {
                $query->where('title', 'like', "%{$search}%");
            })
            ->orderBy('created_at', 'desc')
            ->orderBy('id', 'desc')
            ->cursorPaginate(PaginationEnum::PAGE_SIZE->value)
            ->withQueryString();

        return Inertia::render('Home/Index',
            [
                'posts' => PostResource::collection($posts),
                'filters' => $request->only(['search']),
            ]);
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
            $file = $request->file('image');
            $filename = uniqid() . '.webp';
            $storagePath = storage_path('app/public/posts');

            if (!is_dir($storagePath)) {
                mkdir($storagePath, 0755, true);
            }

            $manager = ImageManager::usingDriver(Driver::class);

            $image = $manager->decodeSplFileInfo($file);

            $image->scale(width: 1200);

            $encoded = $image->encodeUsingFormat(Format::WEBP, quality: 65);

            $encoded->save($storagePath . '/' . $filename);
            $createData['image'] = 'posts/' . $filename;
        }
        $request->user()->posts()->create($createData->toArray());

        return redirect()->back();
    }
}
