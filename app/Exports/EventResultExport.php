<?php

namespace App\Exports;

use App\Models\Event;
use App\Models\Player;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class EventResultExport implements FromCollection, WithHeadings
{
    private Event $event;

    public function __construct(int $eventId)
    {
        $this->event = Event::with(['players.items', 'items'])->findOrFail($eventId);
    }

    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        $event = $this->event;

        return $event->players->map(function ($player) use ($event) {
            $row = [
                'number' => $player->player_number,
                'player' => $player->name,
            ];

            $correctItemIds = $player->items->pluck('id');

            foreach ($event->items as $item) {
                $row[$item->id] = $correctItemIds->contains($item->id) ? $item->score : 0;
            }

            return $row;
        });
    }

    public function headings(): array
    {
        $itemHeadings = $this->event->items->map(fn($item) => 'Item ' . $item->id)->toArray();

        return ["#", "Player", ...$itemHeadings];
    }
}
