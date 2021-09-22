<?php

declare(strict_types=1);

namespace App\Study\Model\Business;

use App\Http\Resources\StudyResource;
use App\Models\Deck as ModelsDeck;
use App\Models\Card as ModelsCard;
use App\Services\SuperMemo;
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
        $superMemo = (new SuperMemo())->calculate($request->quality, $card->interval, $card->repetitions,  $card->ease_factor);

        $card->update([
            'interval' => $superMemo['interval'],
            'ease_factor' => $superMemo['ease_factor'],
            'repetitions' => $superMemo['repetitions'],
            'review_date' => Carbon::today()->addDays($superMemo['interval'])->toDateString()
        ]);

        return $card;
    }
}
