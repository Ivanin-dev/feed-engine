<?php

namespace Database\Seeders;

use App\Models\Post;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class PostSeeder extends Seeder
{
    public function run(): void
    {


        Post::factory(150)->create();
    }
}
