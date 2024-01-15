<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

use App\Models\User;
use App\Models\TipUsluge;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Usluga>
 */
class UslugaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $usluge = [
            'Personalni trener u teretani NSF',
            'Privatni trener tenisa',
            'TikTok video editor',
            'Instagram menadzer profila',
            'Pravljene sajtova',
            'Snimanje personalizovanih reklama za velike brendove',
            'Obucar',
            'Hemijsko ciscenje',
            'Izrada diplomskih radova'
        ];

        return [
            'naziv' => $this->faker->randomElement($usluge), 
            'opis' => $this->faker->sentence(),
            'grad' => $this->faker->city(),
            'adresa' => $this->faker->streetAddress(),
            'cena' => $this->faker->numberBetween($min = 1000, $max = 50000),
            'user_prodaje_id' => User::factory(),
            'user_kupuje_id' => User::factory(),
            'tip_usluge_id' => TipUsluge::factory(), 
        ];
    }
}
