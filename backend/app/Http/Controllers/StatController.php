<?php

namespace App\Http\Controllers;

use App\Http\Resources\StatResource;
use App\Stat\StatFacade;

class StatController extends Controller
{
    protected $stat;

    public function __construct(StatFacade $stat)
    {
        $this->stat = $stat;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return new StatResource([
            "StudiedCardsByQuality" => $this->stat->getStudiedCardsByQuality(),
            "CreatedCardsWeekly" => $this->stat->getCreatedCardsWeekly()
        ]);
    }
}
