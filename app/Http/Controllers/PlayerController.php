<?php

namespace App\Http\Controllers;

use App\Events\PlayerDeleted;
use App\Events\PlayerUpdated;
use App\Models\Event;
use App\Models\Player;
use Illuminate\Http\Request;

class PlayerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function store(Request $request, Event $event)
    {
        $validated = $request->validate([
            "name" => "required|string",
        ]);

        $player = $event->players()->create($validated);

        broadcast(new PlayerUpdated($player));

        return back();
    }

    public function score(Request $request, Event $event, Player $player)
    {
        $validated = $request->validate([
            'item' => ['required', 'exists:items,id'],
        ]);

        $player->items()->toggle($validated);

        broadcast(new PlayerUpdated($player));

        return;
    }

    /**
     * Display the specified resource.
     */
    public function show(Player $player)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Player $player)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Event $event, Player $player)
    {
        $validated = $request->validate([
            'name' => "required|string",
        ]);

        $player->update($validated);

        broadcast(new PlayerUpdated($player));

        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Event $event, Player $player)
    {
        $player->delete();
        broadcast(new PlayerDeleted($player));

        return back();
    }
}
