<?php

namespace Database\Factories;

use App\Models\Story;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Storage;

class StoryFactory extends Factory
{
    protected $model = Story::class;

    public function definition(): array
    {
        $user = User::inRandomOrder()->first();

        $files = glob(database_path('seeders/images/stories/*.jpg'));
        $source = $files[array_rand($files)];

        $filename = uniqid().'.jpg';

        Storage::disk('public')->put('stories/'.$filename, file_get_contents($source));

        return [
            'caption' => $this->faker->word(),
            'media_path' => 'stories/'.$filename,
            'media_type' => 'image',
            'preview_path' => 'stories/'.$filename,
            'expires_at' => Carbon::now()->addDay(),
            'created_at' => Carbon::now(),

            'user_id' => $user->id,
        ];
    }
}
