<?php

declare(strict_types=1);

namespace App\Study;

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
}
