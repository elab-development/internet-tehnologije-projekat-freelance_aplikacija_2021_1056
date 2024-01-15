<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UslugaResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->resource->id,
            'naziv' => $this->resource->naziv,
            'opis' => $this->resource->opis,
            'grad' => $this->resource->grad,
            'adresa' => $this->resource->adresa,
            'cena' => $this->resource->cena,
            'user_prodaje_id' => new UserResource($this->resource->userKojiProdaje),
            'user_kupuje_id' => new UserResource($this->resource->userKojiKupuje),
            'tip_usluge_id' => new TipUslugeResource($this->resource->tipUsluge),
        ];
    }
}
