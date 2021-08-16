<?php

declare(strict_types=1);

namespace App\Study\Model\Business;

use App\Http\Resources\StudyResource;
use App\Models\Deck as ModelsDeck;
use App\Models\Card as ModelsCard;
use Carbon\Carbon;
use Illuminate\Http\Request;

final class Study
{
    public function findOrFail($id)
    {
        $deck = ModelsDeck::withCount(['cards', 'due_cards'])->findOrFail($id);
        $cards = ModelsCard::where('deck_id', $id)
            ->where(function ($query) {
                return $query->whereNull('review_date')
                    ->orWhere('review_date', '<=', Carbon::today());
            })
            ->get();

        $deck['cards'] = $cards;

        return new StudyResource($deck);
    }

    public function update(Request $request, ModelsCard $card)
    {
        $card->update([
            'interval' => $request->interval,
            'ease_factor' => $request->ease_factor,
            'repetitions' => $request->repetitions,
            'review_date' => Carbon::today()->addDays($request->interval)->toDateString()
        ]);
    }
}
