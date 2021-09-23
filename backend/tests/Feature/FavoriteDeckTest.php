<?php

namespace Tests\Feature;

use App\Models\Deck;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Response;
use Tests\TestCase;

class FavoriteDeckTest extends TestCase
{
    use RefreshDatabase;

    public function test_deck_can_be_mark_as_favorite()
    {
        $deck = Deck::factory()->create([ 'favorite' => 0]);

        $response = $this->post("api/decks/$deck->id/favorite");

        $response->assertStatus(Response::HTTP_OK);

        $this->assertEquals(1, $deck->fresh()->favorite);
    }
    
    public function test_deck_can_be_unmark_as_favorite()
    {
        $deck = Deck::factory()->create([ 'favorite' => 1]);

        $response = $this->post("api/decks/$deck->id/favorite");

        $response->assertStatus(Response::HTTP_OK);

        $this->assertEquals(0, $deck->fresh()->favorite);
    }
}
