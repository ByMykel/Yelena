<?php

declare(strict_types=1);

namespace App\Deck;

use App\Deck\Model\Business\Deck;

final class DeckFactory
{
    public function createDeck(): Deck
    {
        return new Deck();
    }
}