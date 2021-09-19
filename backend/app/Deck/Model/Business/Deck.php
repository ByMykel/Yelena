<?php

declare(strict_types=1);

namespace App\Deck\Model\Business;

use App\Http\Resources\DeckResource;
use App\Models\Deck as ModelsDeck;
use App\Models\Card as ModelsCard;
use Illuminate\Http\Request;

final class Deck
{
    public function paginate()
    {
        $decks = ModelsDeck::withCount(['cards', 'due_cards'])
            ->orderBy('favorite', 'desc')
            ->orderBy('due_cards_count', 'desc')
            ->orderBy('cards_count', 'desc')
            ->paginate();

        return DeckResource::collection($decks);
    }

    public function all()
    {
        return DeckResource::collection(ModelsDeck::withCount('cards')->get());
    }

    public function findOrFail(Request $request, $id)
    {
        $deck['deck'] = ModelsDeck::findOrFail($id);
        $deck['cards'] = ModelsCard::where('deck_id', $id)
            ->orderBy('favorite', 'desc')
            ->orderBy('review_date', 'asc')
            ->paginate();

        return new DeckResource($deck);
    }

    public function create(Request $request)
    {
        $deck = ModelsDeck::create([
            'name' => $request->name,
            'favorite' => 0
        ]);

        return new DeckResource($deck); 
    }

    public function createDeck($name)
    {
        return ModelsDeck::create(['name' => $name]);
    }

    public function update(Request $request, ModelsDeck $deck)
    {
        $deck->update(['name' => $request->name]);
    }

    public function delete(ModelsDeck $deck)
    {
        $deck->delete();
    }

    public function favorite(ModelsDeck $deck)
    {
        $deck->update(['favorite' => 1]);
    }

    public function unfavorite(ModelsDeck $deck)
    {
        $deck->update(['favorite' => 0]);
    }
}
