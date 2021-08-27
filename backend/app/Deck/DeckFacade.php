<?php

declare(strict_types=1);

namespace App\Deck;

use App\Models\Deck;
use Illuminate\Http\Request;

final class DeckFacade
{
    public $deckFactory;

    public function __construct(DeckFactory $deckFactory)
    {
        $this->deckFactory = $deckFactory;
    }

    public function getDecks()
    {
        return $this->deckFactory->createDeck()->paginate();
    }

    public function getAllDecks()
    {
        return $this->deckFactory->createDeck()->all();
    }

    public function getDeckById(Request $request, $id)
    {
        return $this->deckFactory->createDeck()->findOrFail($request, $id);
    }

    public function createDeck(Request $request)
    {
        return $this->deckFactory->createDeck()->create($request);
    }

    public function createDeckWithoutRequest($name)
    {
        return $this->deckFactory->createDeck()->createDeck($name);
    }

    public function updateDeck(Request $request, Deck $deck)
    {
        return $this->deckFactory->createDeck()->update($request, $deck);
    }

    public function deleteDeck(Deck $deck)
    {
        return $this->deckFactory->createDeck()->delete($deck);
    }

    public function favorite(Deck $deck)
    {
        return $this->deckFactory->createDeck()->favorite($deck);
    }

    public function unfavorite(Deck $deck)
    {
        return $this->deckFactory->createDeck()->unfavorite($deck);
    }
}
