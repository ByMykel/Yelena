<?php

namespace Tests\Feature;

use App\Models\Card;
use App\Models\Deck;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\Response;
use Tests\TestCase;

class DeleteCardTest extends TestCase
{
    use RefreshDatabase;

    public function test_card_can_be_deleted()
    {
        Deck::factory()->create();

        $card = Card::factory()->create();

        $response = $this->delete("api/cards/$card->id/destroy");

        $response->assertStatus(Response::HTTP_OK);

        $this->assertNull($card->fresh());
    }
}
