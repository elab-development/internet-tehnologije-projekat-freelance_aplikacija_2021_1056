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
        Schema::table('usluge', function (Blueprint $table) {
            $table->foreignId('user_prodaje_id')->nullable()->references('id')->on('users')->onDelete('set null');
            $table->foreignId('user_kupuje_id')->nullable()->references('id')->on('users')->onDelete('set null');
            $table->foreignId('tip_usluge_id')->nullable()->references('id')->on('tipovi_usluga')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('usluge', function (Blueprint $table) {
            $table->dropForeign('user_prodaje_id');
            $table->dropForeign('user_kupuje_id');
            $table->dropForeign('tip_usluge_id');
        });
    }
};
