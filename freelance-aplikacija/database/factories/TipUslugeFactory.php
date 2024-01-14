<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TipUsluge>
 */
class TipUslugeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        $tipovi = [
            'Sport',
            'Drustvene mreze',
            'Editorske usluge',
            'Finansijske usluge',
            'Pravne usluge',
        ];

        return [
            'naziv' => $this->faker->randomElement($tipovi), 
            'opis' => $this->faker->sentence(),
        ];
    }
}
