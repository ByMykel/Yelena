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
        $deckCreated = false;
        $cards_count = 0;

        $file_handle = fopen($request->file('file'), 'r');

        while (!feof($file_handle)) {
            $line_of_text = fgetcsv($file_handle, 0);

            if (!$deckCreated) {
                $deck = $this->deck->createDeckWithoutRequest("Vocabulary | $line_of_text[0] to $line_of_text[1]");
                $deckCreated = true;
            }

            $this->card->createCardWithoutRequest($deck->id, $line_of_text[2], $line_of_text[3]);

            $cards_count += 1;
        }

        fclose($file_handle);

        return ['deck' => $deck, 'cards_count' => $cards_count];
    }
}
