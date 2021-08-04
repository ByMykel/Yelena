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

    public function getCards()
    {
        return $this->cardFactory->createCard()->all();
    }

    public function getCardById($id)
    {
        return $this->cardFactory->createCard()->findOrFail($id);
    }

    public function createCard(Request $request)
    {
        return $this->cardFactory->createCard()->create($request);
    }

    public function updateCard(Request $request, Card $card)
    {
        return $this->cardFactory->createCard()->update($request, $card);
    }

    public function deleteCard(Card $card)
    {
        return $this->cardFactory->createCard()->delete($card);
    }
}
