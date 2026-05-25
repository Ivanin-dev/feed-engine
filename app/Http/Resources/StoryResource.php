<?php

namespace App\Http\Resources;

use App\Models\Story;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin Story */
class StoryResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'caption' => $this->caption,
            'media_type' => $this->media_type,
            'media_path' => $this->media_path,
            'preview_path' => $this->preview_path,
            'user_id' => $this->user_id,
            'expires_at' => $this->expires_at,
            'is_active' => $this->is_active,
            'updated_at' => $this->updated_at,
            'created_at' => $this->created_at->format('d.m.Y'),

        ];
    }
}
