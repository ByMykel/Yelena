<?php

declare(strict_types=1);

namespace App\Deck\Model\Business;

use App\Http\Resources\DeckResource;
use App\Models\Deck as ModelsDeck;
use Illuminate\Http\Request;

final class Deck
{
    public function all()
    {
        return DeckResource::collection(ModelsDeck::all());
    }

    public function findOrFail($id)
    {
        return new DeckResource(ModelsDeck::findOrFail($id));
    }

    public function create(Request $request)
    {
        ModelsDeck::create($request->all());
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
