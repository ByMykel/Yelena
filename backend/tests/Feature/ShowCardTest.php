<?php

namespace Tests\Feature;

use App\Models\Card;
use App\Models\Deck;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\Response;
use Tests\TestCase;

class ShowCardTest extends TestCase
{
    use WithFaker;
    use RefreshDatabase;

    public function test_card_can_be_displayed_successfully()
    {
        Deck::factory()->create();
        $card = Card::factory()->create();

        $response = $this->get("api/cards/$card->id");

        $response->assertStatus(Response::HTTP_OK);

        $response->assertExactJson([
            'data' => [
                'id' => $card->id,
                'deck_id' => "1",
                'question' => $card->question,
                'answer' => $card->answer,
                'ease_factor' => 2.5,
                'interval' => 0,
                'repetitions' => 0,
                'favorite' => $card->favorite,
                'review_date' => null,
                'review_date_human' => $card->review_date_human,
                'created_at' => $card->created_at,
                'updated_at' => $card->updated_at,
            ]
        ]);
    }
}
