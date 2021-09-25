<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\Response;
use Tests\TestCase;

class CreateDeckTest extends TestCase
{
    use WithFaker;
    use DatabaseMigrations;

    public function test_deck_is_created_successfully()
    {
        $deckData = [
            'name' => $this->faker->sentence(2, true),
            'favorite' => 0
        ];

        $response = $this->post('api/decks/store', $deckData);

        $response->assertStatus(Response::HTTP_CREATED);

        $response->assertJsonStructure([
            'data' => [
                'id',
                'name',
                'favorite',
                'updated_at',
                'created_at'
            ]
        ]);

        $this->assertDatabaseHas('decks', $deckData);
    }
}
