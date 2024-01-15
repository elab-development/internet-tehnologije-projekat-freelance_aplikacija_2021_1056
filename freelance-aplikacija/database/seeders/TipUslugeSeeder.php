<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\TipUsluge;

class TipUslugeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        TipUsluge::create([
            'naziv' => 'IT usluge', 
            'opis' => 'Usluge u domenu informacionih tehnologija.',
        ]);


        TipUsluge::factory()->times(5)->create();
    }
}
