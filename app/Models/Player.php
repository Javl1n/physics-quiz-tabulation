<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Player extends Model
{
    /** @use HasFactory<\Database\Factories\PlayerFactory> */
    use HasFactory;

    protected $fillable = ['name'];

    public function event()
    {
        return $this->belongsTo(Event::class, 'event_id');
    }
    public function scores()
    {
        return $this->hasMany(Score::class, 'player_id');
    }
}
