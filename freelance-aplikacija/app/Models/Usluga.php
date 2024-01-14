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
        'cena',
        'user_prodaje_id',
        'user_kupuje_id',
        'tip_usluge_id', 
    ];

    public function userKojiKupuje() {
        return $this->belongsTo(User::class, 'user_kupuje_id');
    }

    public function userKojiProdaje() {
        return $this->belongsTo(User::class, 'user_prodaje_id');
    }

    public function tipUsluge() {
        return $this->belongsTo(TipUsluge::class);
    }

}
