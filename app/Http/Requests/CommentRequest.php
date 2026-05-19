<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CommentRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'text' => ['required', 'max:1000', 'string'],
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}
