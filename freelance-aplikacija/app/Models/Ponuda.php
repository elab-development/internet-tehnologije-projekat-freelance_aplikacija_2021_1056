<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ponuda extends Model
{
    use HasFactory;
    protected $table = 'ponude';

    protected $fillable = [
        'user_id',
        'opis',
        'cena',
        'cv',
        'usluga_id',
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function usluga() {
        return $this->belongsTo(Usluga::class);
    }
}
