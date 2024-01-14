<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\Usluga;

class UslugaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        Usluga::create([
            'naziv' => 'Casovi internet programiranja', 
            'opis' => 'Profesor sam informatike i dobro znam internet programiranje. Predajem casove preko MS Teams platforme. Za vise informacija kontaktirajte me.',
            'grad' => 'Beograd',
            'adresa' => 'Gojkova 15C',
            'cena' => '2500',
            'user_prodaje_id' => 6,
            'user_kupuje_id' => rand(1, 5),
            'tip_usluge_id' => 1, 
        ]);

        Usluga::create([
            'naziv' => 'Popravljanje laptopova', 
            'opis' => 'Diplomirani inzenjer ETF-a nudi usluge popravljanja laptopova. Za vise informacija kontaktirajte me.',
            'grad' => 'Beograd',
            'adresa' => 'Spasenoviceva 25B',
            'cena' => '8000',
            'user_prodaje_id' => 7,
            'user_kupuje_id' => rand(1, 5),
            'tip_usluge_id' => 1, 
        ]);

        Usluga::create([
            'naziv' => 'Usluge hakovanja profila na drustvenim mrezama', 
            'opis' => 'Haker, iskljucivo ozbiljne ponude.',
            'grad' => 'Beograd',
            'adresa' => 'Ljermontova 4B',
            'cena' => '100000',
            'user_prodaje_id' => 8,
            'user_kupuje_id' => rand(1, 5),
            'tip_usluge_id' => 1, 
        ]);

        Usluga::factory()->times(5)->create();

    }
}
