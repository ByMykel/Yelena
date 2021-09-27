<?php

declare(strict_types=1);

namespace App\Stat;

use App\Stat\Model\Business\Stat;

final class StatFactory
{
    public function createStat(): Stat
    {
        return new Stat();
    }
}