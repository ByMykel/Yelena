<?php

namespace App\Services;

class SuperMemo
{
    public function calculate($quality, $oldInterval, $oldRepetitions, $oldEaseFactor)
    {
        if ($quality >= 3) {
            switch ($oldRepetitions) {
                case 0:
                    $interval = 1;
                    break;
                case 1:
                    $interval = 6;
                    break;
                default:
                    $interval = round($oldInterval * $oldEaseFactor);
            }

            $repetitions = $oldRepetitions + 1;
        } else {
            $repetitions = 0;
            $interval = 1;
        }

        $easeFactor = $oldEaseFactor + (0.1 - (5 - $quality) * (0.08 + (5 - $quality) * 0.02));
        $easeFactor = max($easeFactor, 1.3);

        return [
            'interval' => $interval,
            'repetitions' => $repetitions,
            'ease_factor' => $easeFactor
        ];
    }
}
