<?php

namespace App\Http\Controllers;

use App\Events\ItemUpdated;
use App\Models\Event;
use App\Models\Item;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class ItemController extends Controller
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
        $event = $event->load(['items', 'latestItem']);
        $latestItem = $event->latestItem;

        $item = $event->items()->create([
            'index' => $latestItem->index + 1,
            'score' => $latestItem->score
        ]);

        broadcast(new ItemUpdated($item));

        return redirect(route('events.show', [
            'event' => $event,
            'question' => $item->index
        ]));
    }

    /**
     * Display the specified resource.
     */
    public function show(Item $item)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Item $item)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Event $event, Item $item)
    {

        $validated = $request->validate([
            'score' => ['required', 'integer']
        ]);

        $item->update($validated);

        broadcast(new ItemUpdated($item));

        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Item $item)
    {
        //
    }
}
