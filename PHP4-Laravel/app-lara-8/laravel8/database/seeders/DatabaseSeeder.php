<?php

namespace Database\Seeders;

use App\Models\Article;
use App\Models\User;
use App\Models\Comment;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
         User::factory(5)->create();
         Article::factory(10)->create();
         Comment::factory(10)->create();
    }
}
