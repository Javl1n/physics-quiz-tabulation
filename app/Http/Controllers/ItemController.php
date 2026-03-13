<?php

namespace App\Http\Controllers;

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

        $request->validate([
            'operation' => ['required', Rule::in(['+', '-'])]
        ]);

        $score = $item->score;

        switch ($request->operation) {
            case '+':
                $score += 1;
                break;
            case '-':
                $score -= 1;
                break;
            default:
                return back();
                break;
        }

        $item->update([
            'score' => $score
        ]);

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
