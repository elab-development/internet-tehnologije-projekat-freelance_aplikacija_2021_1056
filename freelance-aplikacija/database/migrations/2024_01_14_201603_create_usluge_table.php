<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('usluge', function (Blueprint $table) {
            $table->id();
            $table->string('naziv',60);
            $table->string('opis',10);
            $table->string('grad',60);
            $table->string('adresa',60);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('usluge');
    }
};
