<?php

namespace App\Http\Controllers;

use App\Deck\DeckFacade;
use App\Models\Deck;
use Illuminate\Http\Request;

class DeckController extends Controller
{
    protected $deck;

    public function __construct(DeckFacade $deck)
    {
        $this->deck = $deck;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return $this->deck->getDecks();
    }

    /**
     * Display a listing of the resource.
     */
    public function list()
    {
        return $this->deck->getAllDecks();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        return $this->deck->createDeck($request);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, Deck $deck)
    {
        return $this->deck->getDeckById($request, $deck->id);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Deck $deck)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Deck $deck)
    {
        $this->deck->updateDeck($request, $deck);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Deck $deck)
    {
        $this->deck->deleteDeck($deck);
    }

    /**
     * Mark or unmark as favorite some deck.
     */
    public function favorite(Deck $deck)
    {
        if ($deck->favorite) {
            $this->deck->unfavorite($deck);
            return;
        }

        $this->deck->favorite($deck);
    }
}
