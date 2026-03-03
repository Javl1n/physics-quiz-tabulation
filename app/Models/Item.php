<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    /** @use HasFactory<\Database\Factories\ItemFactory> */
    use HasFactory;

    protected $fillable = ['index', 'score'];

    public function event()
    {
        return $this->belongsTo(Event::class, 'event_id');
    }

    public function players()
    {
        return $this->belongsToMany(Player::class);
    }
}
