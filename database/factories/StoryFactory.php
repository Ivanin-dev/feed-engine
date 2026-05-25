<?php

namespace Database\Factories;

use App\Models\Story;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

class StoryFactory extends Factory
{
    protected $model = Story::class;

    public function definition(): array
    {
        return [
            'caption' => $this->faker->word(),
            'media_path' => 'https://loremflickr.com/400/600?random='.$this->faker->unique()->numberBetween(1, 1000),
            'media_type' => 'image',
            'expires_at' => Carbon::now()->addDay(),
            'created_at' => Carbon::now(),

            'user_id' => User::factory(),
        ];
    }
}
