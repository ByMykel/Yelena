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
            ->orderBy('review_date', 'asc')
            ->paginate();

        return new DeckResource($deck);
    }

    public function create(Request $request)
    {
        ModelsDeck::create($request->all());
    }

    public function createDeck($name)
    {
        return ModelsDeck::create(['name' => $name]);
    }

    public function update(Request $request, ModelsDeck $deck)
    {
        $deck->update($request->all());
    }

    public function delete(ModelsDeck $deck)
    {
        $deck->delete();
    }
}
