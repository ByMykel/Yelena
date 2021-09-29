<?php

namespace Tests\Feature;

use App\Models\Card;
use App\Models\Deck;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Response;
use Tests\TestCase;

class UpdateStudyCardTest extends TestCase
{
    use RefreshDatabase;

    public function test_study_card_can_be_updated_successfully()
    {
        $deck = Deck::factory()->create();

        $card = Card::factory()->create([
            'deck_id' => $deck->id,
            'answer' => 'answer',
            'question' => 'question',
        ]);

        $response = $this->put("api/cards/$card->id/study/update", [
            'name' => 'Hard',
            'quality' => 3,
        ]);

        $response->assertStatus(Response::HTTP_OK);

        $this->assertEquals(1, $card->fresh()->interval);
        $this->assertEquals(1, $card->fresh()->repetitions);
        $this->assertEquals(2.36, $card->fresh()->ease_factor);
    }
}
