<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Card extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $appends = ['review_date_human'];

    protected $casts = [
        'repetitions' => 'integer',
        'ease_factor' => 'float',
        'interval' => 'integer',
        'favorite' => 'boolean',
    ];

    protected $dates = [
        'created_at',
        'updated_at',
        'review_date'
    ];

    public function deck()
    {
        return $this->belongsTo(Deck::class);
    }

    public function getReviewDateHumanAttribute()
    {
        if (!$this->review_date) {
            return "Has never been reviewed";
        }

        if ($this->review_date->isPast()) {
            return "Review now";
        }

        return $this->review_date->diffForHumans();
    }
}
