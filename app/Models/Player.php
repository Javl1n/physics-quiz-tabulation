<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Player extends Model
{
    /** @use HasFactory<\Database\Factories\PlayerFactory> */
    use HasFactory;

    protected $fillable = ['name'];
    protected $appends = ['score'];

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
