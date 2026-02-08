<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    /** @use HasFactory<\Database\Factories\EventFactory> */
    use HasFactory;

    protected $fillable = ['name'];

    public function players()
    {
        return $this->hasMany(Player::class, 'event_id');
    }
    public function items()
    {
        return $this->hasMany(Item::class, 'event_id');
    }
}
