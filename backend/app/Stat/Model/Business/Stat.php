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
}
