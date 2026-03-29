<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::redirect('dashboard', 'events')->middleware(['auth', 'verified'])->name('dashboard');

Route::prefix('events')->name('events.')->controller(App\Http\Controllers\EventController::class)
    ->group(function () {
        Route::get('/', 'index')->name('index');
        Route::post('/', 'store')->name('store');
        Route::get('/{event}', 'show')->name('show');
        Route::get('/{event}/export', 'export')->name('export');
        Route::get('/{event}/timer/{time}', 'timer')->name('timer');
        Route::patch('/{event}', 'update')->name('update');
        Route::delete('/{event}', 'destroy')->name('destroy');
    })->middleware(['auth', 'verified']);

Route::get('events/{event}/leaderboard', [App\Http\Controllers\EventController::class, 'leaderboard'])->name('events.leaderboard');

Route::prefix('events/{event}/players')->name('players.')->controller(App\Http\Controllers\PlayerController::class)
    ->group(function () {
        Route::post('/', 'store')->name('store');
        Route::patch('/{player}', 'update')->name('update');
        Route::delete('/{player}', 'destroy')->name('destroy');
        Route::post('/{player}/score', 'score')->name('score');
    })->middleware(['auth', 'verified']);

Route::prefix('events/{event}/items')->name('items.')->controller(App\Http\Controllers\ItemController::class)
    ->group(function () {
        Route::post('/', 'store')->name('store');
        Route::patch('/{item}', 'update')->name('update');
    })->middleware(['auth', 'verified']);



require __DIR__ . '/settings.php';
