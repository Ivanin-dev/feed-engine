<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoryRequest;
use App\Models\Story;
use ProtoneMedia\LaravelFFMpeg\Support\FFMpeg;
use Str;

class StoriesController
{
    public function index() {}

    public function store(StoryRequest $request)
    {

        $file = $request->file('media');

        $mime = $file->getMimeType();

        $mediaType = str_starts_with($mime, 'video/')
            ? 'video'
            : 'image';

        $folder = $mediaType === 'video'
            ? 'stories/video'
            : 'stories/image';

        $path = $file->store($folder, 'public');

        if ($mediaType === 'video') {
            $thumbnailPath = 'stories/vide/thumbnaul'.Str::uuid()->toString().'.jpg';

            FFMpeg::fromDisk('public')
                ->open($path)
                ->getFrameFromSeconds(1)
                ->export()
                ->toDisk('public')
                ->save($thumbnailPath);

            $previewPath = $thumbnailPath;
        } else {
            $previewPath = $path;
        }

        Story::create([
            'caption' => $request->input('caption'),
            'user_id' => auth()->id(),
            'media_path' => $path,
            'preview_path' => $previewPath,
            'media_type' => $mediaType,
            'expires_at' => now()->addDay(),
        ]);

    }
}
