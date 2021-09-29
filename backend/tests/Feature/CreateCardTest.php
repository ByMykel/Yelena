<?php

namespace Tests\Feature;

use App\Models\Deck;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\Response;
use Tests\TestCase;

class CreateCardTest extends TestCase
{
    use WithFaker;
    use DatabaseMigrations;

    public function test_card_can_be_created_successfully()
    {
        $deck = Deck::factory()->create();

        $cardData = [
            'deck_id' => $deck->id,
            'question' => 'test question',
            'answer' => 'test answer',
            'favorite' => 0
        ];

        $response = $this->post('api/cards/store', $cardData);

        $response->assertStatus(Response::HTTP_CREATED);

        $response->assertJsonStructure([
            'data' => [
                'id',
                'deck_id',
                'question',
                'answer',
                'favorite',
                'updated_at',
                'created_at'
            ]
        ]);

        $this->assertDatabaseHas('cards', $cardData);
    }
}
