<?php

namespace Tests\Feature;

use App\Models\Deck;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\Response;
use Tests\TestCase;

class ShowDeckTest extends TestCase
{
    use WithFaker;
    use RefreshDatabase;

    public function test_deck_is_displayed_successfully()
    {
        $deck = Deck::factory()->create();

        $response = $this->get("api/decks/$deck->id");

        $response->assertStatus(Response::HTTP_OK);

        $response->assertExactJson([
            'data' => [
                'deck' => [
                    'id' => $deck->id,
                    'name' => $deck->name,
                    'favorite' => $deck->favorite,
                    'created_at' => $deck->created_at,
                    'updated_at' => $deck->updated_at,
                ],
                'cards' => [
                    'current_page' => 1,
                    'data' => [],
                    'first_page_url' => "http://localhost/api/decks/$deck->id?page=1",
                    'from' => null,
                    'last_page' => 1,
                    'last_page_url' => "http://localhost/api/decks/$deck->id?page=1",
                    'links' => [
                        [
                            'url' => null,
                            'label' => '&laquo; Previous',
                            'active' => false
                        ],
                        [
                            'url' => "http://localhost/api/decks/$deck->id?page=1",
                            'label' => '1',
                            'active' => true
                        ],
                        [
                            'url' => null,
                            'label' => 'Next &raquo;',
                            'active' => false
                        ]
                    ],
                    'next_page_url' => null,
                    'path' => "http://localhost/api/decks/$deck->id",
                    'per_page' => 15,
                    'prev_page_url' => null,
                    'to' => null,
                    'total' => 0
                ]
            ]
        ]);
    }
}
