<?php

use App\Http\Controllers\CardController;
use App\Http\Controllers\DeckController;
use App\Http\Controllers\ImportDeckController;
use App\Http\Controllers\StudyController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::prefix('cards')->group(function () {
    Route::post('/store', [CardController::class, 'store']);

    Route::prefix('{card}')->group(function () {
        Route::get('/', [CardController::class, 'show']);
        Route::put('/update', [CardController::class, 'update']);
        Route::delete('/destroy', [CardController::class, 'destroy']);

        Route::put('/study/update', [StudyController::class, 'update']);
        Route::post('/favorite', [CardController::class, 'favorite']);
    });
});

Route::get('/decks_list', [DeckController::class, 'list']);
Route::post('/import_deck', [ImportDeckController::class, 'import']);

Route::prefix('decks')->group(function () {
    Route::get('/', [DeckController::class, 'index']);
    Route::post('/store', [DeckController::class, 'store']);

    Route::prefix('{deck}')->group(function () {
        Route::get('/', [DeckController::class, 'show']);
        Route::put('/update', [DeckController::class, 'update']);
        Route::delete('/destroy', [DeckController::class, 'destroy']);

        Route::get('/study', [StudyController::class, 'show']);
        Route::post('/favorite', [DeckController::class, 'favorite']);
    });
});
