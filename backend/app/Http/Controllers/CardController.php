<?php

namespace App\Http\Controllers;

use App\Card\CardFacade;
use App\Models\Card;
use Illuminate\Http\Request;

class CardController extends Controller
{
    protected $card;

    public function __construct(CardFacade $card)
    {
        $this->card = $card;
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
        $this->card->createCard($request);
    }

    /**
     * Display the specified resource.
     */
    public function show(Card $card)
    {
        return $this->card->getCardById($card->id);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Card $card)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Card $card)
    {
        $this->card->updateCard($request, $card);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Card $card)
    {
        $this->card->deleteCard($card);
    }

    /**
     * Mark or unmark as favorite some card.
     */
    public function favorite(Card $card)
    {
        if ($card->favorite) {
            $this->card->unfavorite($card);
            return;
        }

        $this->card->favorite($card);
    }
}
