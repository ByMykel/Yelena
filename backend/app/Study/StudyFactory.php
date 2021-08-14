<?php

declare(strict_types=1);

namespace App\Study;

use App\Study\Model\Business\Study;

final class StudyFactory
{
    public function createStudy()
    {
        return new Study();
    }
}