<?php

declare(strict_types=1);

namespace App\Card;

use App\Card\Model\Business\Card;

final class CardFactory
{
    public function createCard(): Card
    {
        return new Card();
    }
}