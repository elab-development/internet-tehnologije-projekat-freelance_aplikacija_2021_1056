<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Resources\UslugaResource;
use App\Models\Usluga;

use Illuminate\Support\Facades\Auth;

class UslugaController extends Controller
{
    //Prikazi sve usluge
    public function index()
    {
        $usluge = Usluga::all();
        return UslugaResource::collection($usluge);
    }
    //Prikazi odredjenu uslugu na osnovu ID-ija
    public function show($id)
    {
        $usluga = Usluga::findOrFail($id);
        return new UslugaResource($usluga);
    }
    //Okaci oglas za prodaju usluge
    public function okaciOglasZaProdaju(Request $request)
    {
    
    $user_id = Auth::user()->id; 

    $validator = Validator::make($request->all(), [
        'naziv' => 'required',
        'opis' => 'required',
        'grad' => 'required',
        'adresa' => 'required',
        'cena' => 'required',
        'tip_usluge_id' => 'required',
    ]);

    if ($validator->fails()) {
        return response()->json($validator->errors());
    }

    $usluga = new Usluga();
    $usluga->naziv = $request->naziv;
    $usluga->opis = $request->opis;
    $usluga->grad = $request->grad;
    $usluga->adresa = $request->adresa;
    $usluga->cena = $request->cena;
    $usluga->tip_usluge_id = $request->tip_usluge_id;
    $usluga->user_prodaje_id = $user_id;
    $usluga->user_kupuje_id = -1;

    $usluga->save();

    return response()->json(['Okacio oglas za prodaju!!!',
         new UslugaResource($usluga)]);
    }
    //Kupi oglas
        public function kupiUsluguNaOglasu(Request $request, $id)
        {
        $user_id = Auth::user()->id; 
    
        $usluga = Usluga::findOrFail($id);
        $usluga->user_kupuje_id = $user_id;
        $usluga->save();
    
        return response()->json(['Korisnik je uspesno kupio uslugu!!!',
             new UslugaResource($usluga)]);
        }
    //Azuriraj oglas za prodaju
    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(), [
            'naziv' => 'required',
            'opis' => 'required',
            'grad' => 'required',
            'adresa' => 'required',
            'cena' => 'required',
            'tip_usluge_id' => 'required',
        ]);

        if ($validator->fails()) {
            $errors = $validator->errors();
            return response()->json($errors);
        }

        $usluga_user_id = Usluga::where('id', $id)->value('user_id');

        if($user_id != $usluga_user_id){
            return response()->json(['error' => 'NEOVLASCEN PRISTUP: Dati korisnik nije kreator ovog oglasa za uslugu!'], 403);
        }

        $usluga = Usluga::findOrFail($id);

        $usluga->naziv = $request->naziv;
        $usluga->opis = $request->opis;
        $usluga->grad = $request->grad;
        $usluga->adresa = $request->adresa;
        $usluga->cena = $request->cena;
        $usluga->tip_usluge_id = $request->tip_usluge_id;

        $usluga->save();

        return response()->json(['Usluga je uspesno izmenjena!', new UslugaResource($usluga)]);
    }
//Izmeni samo cenu
    public function updateCenu(Request $request, $id)
    {
        $request->validate([
            'opis' => 'required'
        ]);

        $usluga_user_id = Usluga::where('id', $id)->value('user_id');

        if($user_id != $usluga_user_id){
            return response()->json(['error' => 'NEOVLASCEN PRISTUP: Dati korisnik nije kreator ovog oglasa za uslugu!'], 403);
        }

        $usluga = Usluga::findOrFail($id);

        $usluga->update(['opis' => $request->input('opis')]);

        return response()->json(['message' => 'Uspesno izmenjen opis usluge.', new UslugaResource($usluga)]);
    }




//Obrisi odredjenu uslugu na osnovu ID-ija
    public function destroy($id)
    {
        $usluga_user_id = Usluga::where('id', $id)->value('user_id');

        if($user_id != $usluga_user_id){
            return response()->json(['error' => 'NEOVLASCEN PRISTUP: Dati korisnik nije kreator ovog oglasa za uslugu!'], 403);
        }
        $usluga = Usluga::findOrFail($id);
        $usluga->delete();
        return response()->json('Data usluga je uspesno obrisana!');
    }
}
