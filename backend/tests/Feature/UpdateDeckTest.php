<?php

namespace Tests\Feature;

use App\Models\Deck;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\Response;
use Tests\TestCase;

class UpdateDeckTest extends TestCase
{
    use RefreshDatabase;

    public function test_deck_is_updated_successfully()
    {
        $deck = Deck::factory()->create([
            'name' => 'test name'
        ]);

        $response = $this->put("api/decks/$deck->id/update", [
            'name' => 'new test name'
        ]);

        $response->assertStatus(Response::HTTP_OK);

        $this->assertEquals('new test name', $deck->fresh()->name);
    }
}
