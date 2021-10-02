<?php

declare(strict_types=1);

namespace App\Stat;

final class StatFacade
{
    public $statFactory;

    public function __construct(StatFactory $statFactory)
    {
        $this->statFactory = $statFactory;
    }

    public function getStudiedCardsByQuality()
    {
        return $this->statFactory->createStat()->getStudiedCardsByQuality();
    }

    public function getCreatedCardsWeekly()
    {
        return $this->statFactory->createStat()->getCreatedCardsWeekly();
    }

    public function createStat($cardId, $quality)
    {
        $this->statFactory->createStat()->create($cardId, $quality);
    }
}
