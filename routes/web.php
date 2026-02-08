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
    })->middleware(['auth', 'verified']);


require __DIR__ . '/settings.php';
