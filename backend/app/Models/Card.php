<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Card extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = [
        'repetitions' => 'integer',
        'ease_factor' => 'float',
        'interval' => 'integer',
    ];

    public function deck()
    {
        return $this->belongsTo(Deck::class);
    }
}
