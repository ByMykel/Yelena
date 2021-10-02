<?php

declare(strict_types=1);

namespace App\Stat\Model\Business;

use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

final class Stat
{
    public function create($cardId, $quality)
    {
        DB::table('card_stats')->insert([
            'card_id' => $cardId,
            'quality' => $quality,
            'created_at' =>  Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
    }

    public function getStudiedCardsByQuality()
    {
        $StudiedCardsByQuality = DB::table('card_stats')
            ->selectRaw('quality, COUNT(*) AS total')
            ->groupBy('quality')
            ->pluck('total', 'quality')
            ->all();

        $qualities = ["Incorrect", "Hard", "Good", "Easy"];

        foreach($qualities as $quality) {
            $cardsCount = $StudiedCardsByQuality[$quality];

            $data[] = [
                'quality' => $quality,
                'cards_count' => $cardsCount ? intval($cardsCount) : 0
            ];
        }

        return $data;
    }

    public function getCreatedCardsWeekly()
    {
        $createdCardsWeekly = DB::table('cards')
            ->whereBetween('created_at', [Carbon::now()->startOfWeek(Carbon::MONDAY), Carbon::now()->endOfWeek(Carbon::SUNDAY)])
            ->selectRaw('DATE(created_at) AS date, COUNT(*) AS total')
            ->groupBy('date')
            ->get()
            ->toArray();

        for ($i = 0; $i < 7; $i++) {
            $date = Carbon::now()->startOfWeek(Carbon::MONDAY)->addDay($i)->toDateString();
            $CreatedCards = array_filter($createdCardsWeekly, function ($item) use ($date) {
                return $item->date === $date;
            });

            $data[] = [
                'date' => $date,
                'day' => $i + 1,
                'created_cards_count' => $CreatedCards ? intval(array_pop($CreatedCards)->total) : 0
            ];
        }


        return $data;
    }
}
