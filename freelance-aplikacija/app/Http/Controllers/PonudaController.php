<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Ponuda;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class PonudaController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'opis' => 'required|string',
            'cena' => 'required|numeric',
            'cv' => 'required|file|mimes:pdf,doc,docx',
            'usluga_id' => 'required|exists:usluge,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $file = $request->file('cv');
        $filePath = $file->store('cvs', 'public');

        $ponuda = new Ponuda();
        $ponuda->user_id = Auth::id();
        $ponuda->opis = $request->opis;
        $ponuda->cena = $request->cena;
        $ponuda->cv = $filePath;
        $ponuda->usluga_id = $request->usluga_id;
        $ponuda->save();

        return response()->json(['message' => 'Ponuda uspešno kreirana!', 'ponuda' => $ponuda]);
    }

    public function index($usluga_id)
    {
        $ponude = Ponuda::with('user')->where('usluga_id', $usluga_id)->get();
    
        foreach ($ponude as $ponuda) {
            $ponuda->cv_url = asset('storage/' . $ponuda->cv);
        }
    
        return response()->json(['ponude' => $ponude]);
    }
    

    public function delete($id)
    {
        $ponuda = Ponuda::findOrFail($id);
        $this->authorize('delete', $ponuda);
        $ponuda->delete();

        return response()->json(['message' => 'Ponuda uspešno obrisana!']);
    }
}
