<?php

declare(strict_types=1);

namespace App\Study\Model\Business;

use App\Http\Resources\StudyResource;
use App\Models\Deck as ModelsDeck;

final class Study
{
    public function findOrFail($id)
    {
        return new StudyResource(ModelsDeck::with('cards')->withCount('cards')->findOrFail($id));
    }
}
