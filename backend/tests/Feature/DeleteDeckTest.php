<?php

namespace Tests\Feature;

use App\Models\Deck;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Response;
use Tests\TestCase;

class DeleteDeckTest extends TestCase
{
    use RefreshDatabase;

    public function test_deck_can_be_deleted()
    {
        $deck = Deck::factory()->create();

        $response = $this->delete("api/decks/$deck->id/destroy");

        $response->assertStatus(Response::HTTP_OK);

        $this->assertNull($deck->fresh());
    }
}
