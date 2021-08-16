<?php

declare(strict_types=1);

namespace App\Study;

use App\Models\Card;
use Illuminate\Http\Request;

final class StudyFacade
{
    public $studyFactory;

    public function __construct(StudyFactory $studyFactory)
    {
        $this->studyFactory = $studyFactory;
    }

    public function getStudyDeckById($id)
    {
        return $this->studyFactory->createStudy()->findOrFail($id);
    }

    public function update(Request $request, Card $card)
    {
        $this->studyFactory->createStudy()->update($request, $card);
    }
}
