<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Player extends Model
{
    /** @use HasFactory<\Database\Factories\PlayerFactory> */
    use HasFactory;

    protected $fillable = ['name', 'player_number'];
    protected $appends = ['score'];

    protected static function booted(): void
    {
        static::creating(function (Player $player) {
            $max = static::where('event_id', $player->event_id)->max('player_number');
            $player->player_number = ($max ?? 0) + 1;
        });

        static::deleted(function (Player $player) {
            static::where('event_id', $player->event_id)
                ->where('player_number', '>', $player->player_number)
                ->decrement('player_number');
        });
    }

    public function event()
    {
        return $this->belongsTo(Event::class, 'event_id');
    }

    public function items()
    {
        return $this->belongsToMany(Item::class);
    }

    protected function score(): Attribute
    {
        return Attribute::make(
            get: fn() => $this->items->sum('score')
        );
    }
}
