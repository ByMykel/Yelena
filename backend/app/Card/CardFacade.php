<?php

declare(strict_types=1);

namespace App\Card;

use App\Models\Card;
use Illuminate\Http\Request;

final class CardFacade
{
    public $cardFactory;

    public function __construct(CardFactory $cardFactory)
    {
        $this->cardFactory = $cardFactory;
    }
    
    public function getCardById($id)
    {
        return $this->cardFactory->createCard()->findOrFail($id);
    }

    public function createCard(Request $request)
    {
        return $this->cardFactory->createCard()->create($request);
    }

    public function createCardWithoutRequest($id, $question, $answer)
    {
        return $this->cardFactory->createCard()->createCard($id, $question, $answer);
    }

    public function updateCard(Request $request, Card $card)
    {
        return $this->cardFactory->createCard()->update($request, $card);
    }

    public function deleteCard(Card $card)
    {
        return $this->cardFactory->createCard()->delete($card);
    }

    public function favorite(Card $card)
    {
        return $this->cardFactory->createCard()->favorite($card);
    }

    public function unfavorite(Card $card)
    {
        return $this->cardFactory->createCard()->unfavorite($card);
    }
}
