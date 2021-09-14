<?php

declare(strict_types=1);

namespace App\Card\Model\Business;

use App\Http\Resources\CardResource;
use App\Models\Card as ModelsCard;
use Illuminate\Http\Request;

final class Card
{
    public function all()
    {
        return CardResource::collection(ModelsCard::with("deck")->get());
    }

    public function findOrFail($id)
    {
        return new CardResource(ModelsCard::findOrFail($id));
    }

    public function create(Request $request)
    {
        ModelsCard::create($request->all());
    }

    public function createCard($id, $question, $answer)
    {
        ModelsCard::create([
            'deck_id' => $id,
            'question' => $question,
            'answer' => $answer
        ]);
    }

    public function update(Request $request, ModelsCard $card)
    {
        $card->update([
            'question' => $request->question,
            'answer' => $request->answer
        ]);
    }

    public function delete(ModelsCard $card)
    {
        $card->delete();
    }

    public function favorite(ModelsCard $card)
    {
        $card->update(['favorite' => 1]);
    }

    public function unfavorite(ModelsCard $card)
    {
        $card->update(['favorite' => 0]);
    }
}
