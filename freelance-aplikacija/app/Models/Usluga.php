<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Usluga extends Model
{
    use HasFactory;

    protected $table = 'usluge';

    protected $fillable = [
        'naziv',
        'opis', 
        'grad',
        'adresa',
        'user_prodaje_id',
        'user_kupuje_id',
        'tip_usluge_id', 
    ];

}
