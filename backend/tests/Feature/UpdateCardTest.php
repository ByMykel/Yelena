<?php

namespace Tests\Feature;

use App\Models\Card;
use App\Models\Deck;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Response;
use Tests\TestCase;

class UpdateCardTest extends TestCase
{
    use RefreshDatabase;

    public function test_card_can_be_updated_successfully()
    {
        Deck::factory()->create();

        $card = Card::factory()->create([
            'answer' => 'answer',
            'question' => 'question',
        ]);

        $response = $this->put("api/cards/$card->id/update", [
            'answer' => 'new answer',
            'question' => 'new question',
        ]);

        $response->assertStatus(Response::HTTP_OK);

        $this->assertEquals('new answer', $card->fresh()->answer);
        $this->assertEquals('new question', $card->fresh()->question);
    }
}
