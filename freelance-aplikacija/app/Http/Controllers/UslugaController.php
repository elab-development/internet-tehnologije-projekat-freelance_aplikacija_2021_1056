<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Resources\UslugaResource;
use App\Models\Usluga;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

use Illuminate\Support\Facades\Cache;

class UslugaController extends Controller
{
    //Prikazi sve usluge
    public function index()
    {
        $usluge = Usluga::all();
    
        return response()->json(['usluge' => $usluge]);
    }

    //PRIKAZI KESIRANE PODATKE
    public function showCachedUsluge()
{
    $cachedUsluge = Cache::get('all_usluge');

    return response()->json([
        'cached_usluge' => $cachedUsluge
    ], 200);
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
        'cena' => 'required',
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
    $usluga->cena = $request->cena;
    $usluga->grad = $request->grad;
    $usluga->adresa = $request->adresa;
    $usluga->cena = $request->cena;
    $usluga->tip_usluge_id = $request->tip_usluge_id;
    $usluga->user_prodaje_id = $user_id;
    $usluga->user_kupuje_id = null;

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
        $user_id = Auth::user()->id; 

        $validator = Validator::make($request->all(), [
            'naziv' => 'required',
            'cena' => 'required',
            'grad' => 'required',
            'adresa' => 'required',
            'cena' => 'required',
            'tip_usluge_id' => 'required',
        ]);

        if ($validator->fails()) {
            $errors = $validator->errors();
            return response()->json($errors);
        }

        $usluga_user_id = Usluga::where('id', $id)->value('user_prodaje_id');

        if($user_id != $usluga_user_id){
            return response()->json(['error' => 'NEOVLASCEN PRISTUP: Dati korisnik nije kreator ovog oglasa za uslugu!'], 403);
        }

        $usluga = Usluga::findOrFail($id);

        $usluga->naziv = $request->naziv;
        $usluga->cena = $request->cena;
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
        $user_id = Auth::user()->id; 

        $request->validate([
            'cena' => 'required'
        ]);

        $usluga_user_id = Usluga::where('id', $id)->value('user_prodaje_id');

        if($user_id != $usluga_user_id){
            return response()->json(['error' => 'NEOVLASCEN PRISTUP: Dati korisnik nije kreator ovog oglasa za uslugu!'], 403);
        }

        $usluga = Usluga::findOrFail($id);

        $usluga->update(['cena' => $request->input('cena')]);

        return response()->json(['message' => 'Uspesno izmenjena cena usluge.', new UslugaResource($usluga)]);
    }




//Obrisi odredjenu uslugu na osnovu ID-ija
    public function destroy($id)
    {
        $user_id = Auth::user()->id; 

        $usluga_user_id = Usluga::where('id', $id)->value('user_prodaje_id');

        if($user_id != $usluga_user_id){
            return response()->json(['error' => 'NEOVLASCEN PRISTUP: Dati korisnik nije kreator ovog oglasa za uslugu!'], 403);
        }
        $usluga = Usluga::findOrFail($id);
        $usluga->delete();
        return response()->json('Data usluga je uspesno obrisana!');
    }


    // Prikazi usluge koje nudi ulogovani korisnik
    public function mojeUsluge()
    {
        $user = Auth::user();
        if ($user->role !== 'nudi') {
            return response()->json(['error' => 'Samo korisnici sa ulogom "nudi" mogu pristupiti ovoj funkciji!'], 403);
        }

        $usluge = Usluga::where('user_prodaje_id', $user->id)->get();

        return response()->json(['usluge' => UslugaResource::collection($usluge)]);
    }







}
