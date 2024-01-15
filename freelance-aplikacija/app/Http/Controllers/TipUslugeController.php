<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Resources\TipUslugeResource;
use App\Models\TipUsluge;

class TipUslugeController extends Controller
{
    public function index()
    {
        $tipovi = TipUsluge::all();
        return TipUslugeResource::collection($tipovi);
    }

    public function show($id)
    {
        $tip = TipUsluge::findOrFail($id);
        return new TipUslugeResource($tip);
    }
}
