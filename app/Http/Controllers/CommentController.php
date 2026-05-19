<?php

namespace App\Http\Controllers;

use App\Http\Requests\CommentRequest;
use App\Http\Resources\CommentResource;
use App\Models\Comment;
use App\Models\Post;

class CommentController extends Controller
{

    public function store(CommentRequest $request, Post $post)
    {

        $validated = $request->validated();

        $post->comments()->create([
            'user_id' => $request->user()->id,
            'text' => $validated['text'],
        ]);

        return redirect()->back();
    }

    public function show(Comment $comment)
    {
        return new CommentResource($comment);
    }

    public function update(CommentRequest $request, Comment $comment)
    {
        $comment->update($request->validated());

        return new CommentResource($comment);
    }

    public function destroy(Comment $comment)
    {
        $comment->delete();

        return response()->json();
    }
}
