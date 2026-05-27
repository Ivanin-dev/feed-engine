<?php

namespace Database\Factories;

use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Storage;

class PostFactory extends Factory
{
    protected $model = Post::class;

    public function definition(): array
    {
        $files = glob(database_path('seeders/images/posts/*.jpg'));
        $source = $files[array_rand($files)];

        $filename = uniqid().'.jpg';

        Storage::disk('public')->put('posts/'.$filename, file_get_contents($source));

        return [
            'title' => $this->faker->word(),
            'text' => $this->faker->text(),
            'image' => 'posts/'.$filename,
            'slug' => $this->faker->slug(),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),

            'user_id' => User::factory(),
        ];
    }
}
