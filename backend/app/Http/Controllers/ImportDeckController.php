<?php

namespace App\Http\Controllers;

use App\Card\CardFacade;
use App\Deck\DeckFacade;
use Illuminate\Http\Request;

class ImportDeckController extends Controller
{
    protected $deck;
    protected $card;

    public function __construct(DeckFacade $deck, CardFacade $card)
    {
        $this->deck = $deck;
        $this->card = $card;
    }

    /**
     * Create new deck with cards with data imported from csv.
     */
    public function import(Request $request)
    {
        $numberDecks = 0;
        $numberCards = 0;

        foreach ($request->decks as $deckName => $cards) {
            $deckName = explode("-", $deckName);
            $deck = $this->deck->createDeckWithoutRequest("Vocabulary - $deckName[0] to $deckName[1]");

            $numberDecks += 1;

            foreach ($cards as $card) {
                $this->card->createCardWithoutRequest($deck->id, $card['question'], $card['answer']);

                $numberCards += 1;
            }
        }

        return ["message" => "Created successfully $numberDecks decks and $numberCards cards."];
    }
}
