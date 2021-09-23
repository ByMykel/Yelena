<?php

namespace Tests\Feature;

use App\Models\Card;
use App\Models\Deck;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Response;
use Tests\TestCase;

class FavoriteCardTest extends TestCase
{
    use RefreshDatabase;

    public function test_card_can_be_mark_as_favorite()
    {
        Deck::factory()->create();
        $card = Card::factory()->create([ 'favorite' => 0]);

        $response = $this->post("api/cards/$card->id/favorite");

        $response->assertStatus(Response::HTTP_OK);

        $this->assertEquals(1, $card->fresh()->favorite);
    }
    
    public function test_card_can_be_unmark_as_favorite()
    {
        Deck::factory()->create();
        $card = Card::factory()->create([ 'favorite' => 1]);

        $response = $this->post("api/cards/$card->id/favorite");

        $response->assertStatus(Response::HTTP_OK);

        $this->assertEquals(0, $card->fresh()->favorite);
    }
}
