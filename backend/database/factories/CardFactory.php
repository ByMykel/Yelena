<?php

namespace Database\Factories;

use App\Models\Card;
use App\Models\Deck;
use Illuminate\Database\Eloquent\Factories\Factory;

class CardFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Card::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'deck_id' => Deck::inRandomOrder()->first()->id,
            'question' => $this->faker->word(),
            'answer' => $this->faker->word(),
            'favorite' => $this->faker->numberBetween(0, 1),
        ];
    }
}
