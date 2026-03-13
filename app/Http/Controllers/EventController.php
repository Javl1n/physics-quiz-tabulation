<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $event = Event::first();

        if (is_null($event)) {
            return inertia()->render('events/empty');
        }

        return redirect(route('events.show', $event));
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
        $validated = $request->validate([
            'name' => 'required|string',
        ]);

        $event = Event::create($validated);
        $event->items()->create([
            'index' => 1,
            'score' => 1
        ]);
        return redirect(route('events.show', $event));
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, Event $event)
    {
        $events = Event::all();
        $event = $event->load(['players', 'items', 'latestItem']);

        $items = $event->items;
        $item = $request->question ? $items->where('index', $request->question)->first() : $items->first();
        // dd($item);
        $item = $item->load(['players']);

        return inertia()->render('events/show', [
            'event' => $event->load(['players']),
            'events' => $events,
            'question' => $item,
            'questions' => $items,
        ]);
    }

    public function leaderboard(Event $event)
    {
        $event = $event->load(['players', 'items']);

        return inertia()->render('events/leaderboards', [
            'event' => $event
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Event $event)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Event $event)
    {
        $validated = $request->validate([
            "name" => "required|string",
        ]);

        $event->update($validated);

        return redirect(route('events.show', $event));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Event $event)
    {
        $event->delete();

        return redirect(route('events.index'));
    }
}
