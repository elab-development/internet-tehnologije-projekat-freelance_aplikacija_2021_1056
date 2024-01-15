<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\User;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        User::factory()->times(5)->create();

        User::create([
            'name'=>"Savo Mojic",
            'email'=>"savo@gmail.com",
            'password' =>  "savo",
            'remember_token' => Str::random(10),
        ]);

        User::create([
            'name'=>"Amir Hodzic",
            'email'=>"hodza@gmail.com",
            'password' =>  "hodza",
            'remember_token' => Str::random(10),
        ]);

        User::create([
            'name'=>"Dule Savic",
            'email'=>"dule@gmail.com",
            'password' =>  "dule",
            'remember_token' => Str::random(10),
        ]);
    }
}
