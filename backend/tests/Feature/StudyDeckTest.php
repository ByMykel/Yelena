<?php

namespace Tests\Feature;

use App\Models\Card;
use App\Models\Deck;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Response;
use Tests\TestCase;

class StudyDeckTest extends TestCase
{
    use RefreshDatabase;

    public function test_study_deck_is_displayed_successfully()
    {
        $deck = Deck::factory()->create();
        $card = Card::factory()->create();

        $response = $this->get("api/decks/$deck->id/study");

        $response->assertStatus(Response::HTTP_OK);

        $response->assertExactJson([
            "data" => [
                "id" => $deck->id,
                "name" => $deck->name,
                "favorite" => $deck->favorite,
                "created_at" => $deck->created_at,
                "updated_at" => $deck->updated_at,
                "cards_count" => 1,
                "due_cards_count" => 1,
                "cards" => [
                    [
                        "id" => $card->id,
                        "deck_id" => "1",
                        "question" => $card->question,
                        "answer" => $card->answer,
                        "repetitions" => 0,
                        "ease_factor" => 2.5,
                        "interval" => 0,
                        "review_date" => $card->review_date,
                        "favorite" => $card->favorite,
                        "created_at" => $card->created_at,
                        "updated_at" => $card->updated_at,
                        "review_date_human" => $card->review_date_human
                    ]
                ]
            ]
        ]);
    }

    public function test_study_card_can_be_updated()
    {
        Deck::factory()->create();
        $card = Card::factory()->create();

        $response = $this->put("api/cards/$card->id/study/update", ["quality" => 5]);

        $response->assertStatus(Response::HTTP_OK);

        $this->assertEquals(1, $card->fresh()->interval);
        $this->assertEquals(1, $card->fresh()->repetitions);
        $this->assertEquals(2.6, $card->fresh()->ease_factor);
    }
}
