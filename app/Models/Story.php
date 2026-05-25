<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Story extends Model
{
    use HasFactory;

    protected $fillable = [
        'caption',
        'media_type',
        'media_path',
        'preview_path',
        'user_id',
        'expires_at',
        'created_at',
        'is_active',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    protected function casts(): array
    {
        return [
            'expires_at' => 'timestamp',
        ];
    }

    public function scopeIsActive($query)
    {
        return $query->where('is_active', true)
            ->where('expires_at', '>', now());
    }
}
