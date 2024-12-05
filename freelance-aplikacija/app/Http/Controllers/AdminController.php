<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Usluga;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminController extends Controller
{
    public function statistike()
    {
        $brojKorisnikaTipTrazi = User::where('role', 'trazi')->count();
        $brojKorisnikaTipNudi = User::where('role', 'nudi')->count();

        $brojUslugaPoKategorijama = Usluga::select('tip_usluge_id', DB::raw('count(*) as ukupno'))
            ->groupBy('tip_usluge_id')
            ->get();

        return response()->json([
            'broj_korisnika_sa_tipom_trazi' => $brojKorisnikaTipTrazi,
            'broj_korisnika_sa_tipom_nudi' => $brojKorisnikaTipNudi,
            'broj_usluga_po_kategorijama' => $brojUslugaPoKategorijama
        ]);
    }
}
