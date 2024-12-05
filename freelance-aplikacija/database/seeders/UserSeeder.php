<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Kreiranje 2 admin korisnika
        User::create([
            'name' => "Admin One",
            'email' => "admin1@example.com",
            'password' => Hash::make('password'),
            'role' => 'admin',
            'remember_token' => Str::random(10),
        ]);

        User::create([
            'name' => "Admin Two",
            'email' => "admin2@example.com",
            'password' => Hash::make('password'),
            'role' => 'admin',
            'remember_token' => Str::random(10),
        ]);

        // Kreiranje 20 korisnika sa rolom nudi
        for ($i = 1; $i <= 20; $i++) {
            User::create([
                'name' => "Nudi User $i",
                'email' => "nudi$i@example.com",
                'password' => Hash::make('password'),
                'role' => 'nudi',
                'remember_token' => Str::random(10),
            ]);
        }

        // Kreiranje 10 korisnika sa rolom trazi
        for ($i = 1; $i <= 10; $i++) {
            User::create([
                'name' => "Trazi User $i",
                'email' => "trazi$i@example.com",
                'password' => Hash::make('password'),
                'role' => 'trazi',
                'remember_token' => Str::random(10),
            ]);
        }
    }
}
