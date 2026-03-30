<?php

namespace App\Exports;

use App\Models\Event;
use App\Models\Player;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Cell\Coordinate;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class EventResultExport implements FromCollection, WithHeadings, WithStyles
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

        return $event->players->sortByDesc(fn($player) => $player->score)->map(function ($player) use ($event) {
            $row = [
                'player' => $player->name,
            ];

            $correctItemIds = $player->items->pluck('id');

            foreach ($event->items as $item) {
                $row[$item->id] = $correctItemIds->contains($item->id) ? $item->score : "0";
            }

            $row['total'] = (string) $player->score;

            return $row;
        });
    }

    public function headings(): array
    {
        $itemHeadings = $this->event->items->map(fn($item) => 'Q' . $item->id)->toArray();

        return ["Player", ...$itemHeadings, 'Total'];
    }

    public function styles(Worksheet $sheet)
    {
        $event = $this->event;
        $items = $event->items;
        $players = $event->players->sortByDesc(fn($player) => $player->score)->values();

        $sheet->getColumnDimension('A')->setAutoSize(true);

        foreach ($players as $playerIndex => $player) {
            $correctItemIds = $player->items->pluck('id');
            $row = $playerIndex + 2;


            foreach ($items as $itemIndex => $item) {
                $col = Coordinate::stringFromColumnIndex($itemIndex + 2);
                $correct = $correctItemIds->contains($item->id);

                $sheet->getStyle("{$col}{$row}")->applyFromArray([
                    'fill' => [
                        'fillType' => Fill::FILL_SOLID,
                        'startColor' => [
                            'rgb' => $correct ? '90EE90' : 'FF7F7F'
                        ]
                    ]
                ]);
            }
        }
    }
}
