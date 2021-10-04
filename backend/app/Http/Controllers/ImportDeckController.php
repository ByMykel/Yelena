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

        foreach ($request->decks as $deckName => $deckData) {
            if (!$deckData['checked']) {
                continue;
            }

            $deckName = explode("-", $deckName);
            $deck = $this->deck->createDeckWithoutRequest("Vocabulary - $deckName[0] to $deckName[1]");

            $numberDecks += 1;

            foreach ($deckData['cards'] as $card) {
                if (!$card['checked']) {
                    continue;
                }

                $this->card->createCardWithoutRequest($deck->id, $card['question'], $card['answer']);

                $numberCards += 1;
            }
        }

        return ["message" => "Created successfully $numberDecks decks and $numberCards cards."];
    }
}
