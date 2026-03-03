<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    /** @use HasFactory<\Database\Factories\EventFactory> */
    use HasFactory;

    protected $fillable = ['name'];
    protected $appends = ['score'];

    public function players()
    {
        return $this->hasMany(Player::class, 'event_id');
    }
    public function items()
    {
        return $this->hasMany(Item::class, 'event_id');
    }

    public function latestItem()
    {
        return $this->hasOne(Item::class)->orderByDesc('index');
    }

    protected function score(): Attribute
    {
        return Attribute::make(
            get: fn() => $this->items->sum('score')
        );
    }
}
