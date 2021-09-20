<?php

namespace Tests\Feature;

use App\Models\Deck;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\Response;
use Tests\TestCase;

class IndexDecksTest extends TestCase
{
    use WithFaker;
    use RefreshDatabase;

    public function test_decks_are_displayed_successfully()
    {
        $decks = Deck::factory(10)->create([
            'favorite' => 0,
        ]);

        foreach ($decks as $deck) {
            $data[] = [
                'id' => $deck->id,
                'name' => $deck->name,
                'favorite' => $deck->favorite,
                'created_at' => $deck->created_at,
                'updated_at' => $deck->updated_at,
                'cards_count' => 0,
                'due_cards_count' => 0
            ];
        }

        $response = $this->get('api/decks/');

        $response->assertStatus(Response::HTTP_OK);

        $response->assertExactJson([
            'data' => $data,
            'links' => [
                'first' => 'http://backend.test/api/decks?page=1',
                'last' => 'http://backend.test/api/decks?page=1',
                'prev' => null,
                'next' => null
            ],
            'meta' => [
                'current_page' => 1,
                'from' => 1,
                'last_page' => 1,
                'links' => [
                    [
                        'url' => null,
                        'label' => '&laquo; Previous',
                        'active' => false
                    ],
                    [
                        'url' => 'http://backend.test/api/decks?page=1',
                        'label' => '1',
                        'active' => true
                    ],
                    [
                        'url' => null,
                        'label' => 'Next &raquo;',
                        'active' => false
                    ]
                ],
                'path' => 'http://backend.test/api/decks',
                'per_page' => 15,
                'to' => 10,
                'total' => 10
            ]
        ]);
    }
}
