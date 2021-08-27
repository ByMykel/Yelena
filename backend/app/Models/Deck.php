<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Deck extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = [
        'favorite' => 'boolean',
    ];

    public function cards()
    {
        return $this->hasMany(Card::class);
    }

    public function due_cards()
    {
        return $this->cards()
            ->where(function ($query) {
                return $query->whereNull('review_date')
                    ->orWhere('review_date', '<=', Carbon::today());
            });
    }
}
