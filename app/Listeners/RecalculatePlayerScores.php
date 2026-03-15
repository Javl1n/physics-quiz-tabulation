<?php

namespace App\Listeners;

use App\Events\ItemUpdated;
use App\Events\PlayerUpdated;
use App\Models\Player;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class RecalculatePlayerScores
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(ItemUpdated $event): void
    {
        $item = $event->item;

        $item->players->each(function (Player $player) {
            broadcast(new PlayerUpdated($player));
        });
    }
}
