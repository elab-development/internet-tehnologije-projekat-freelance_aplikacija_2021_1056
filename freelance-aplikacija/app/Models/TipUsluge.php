<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TipUsluge extends Model
{
    use HasFactory;

    protected $table = 'tipovi_usluga';

    protected $fillable = [
        'naziv',
        'opis', 
    ];

    
    public function usluge() {
        return $this->hasMany(Usluga::class);
    }
}
