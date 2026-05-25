<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoryRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'caption' => ['required'],
            'media' => ['required', 'file', 'mimetypes:image/jpeg,image/png,image/webp,video/mp4,video/webm'],
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}
