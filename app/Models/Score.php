<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Score extends Model
{
    /** @use HasFactory<\Database\Factories\ScoreFactory> */
    use HasFactory;

    protected $fillable = ['value'];

    public function player()
    {
        return $this->belongsTo(Player::class, 'player_id');
    }
    public function item()
    {
        return $this->belongsTo(Item::class, 'item_id');
    }
}
