<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UslugaController;
use App\Http\Controllers\TipUslugeController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::post('resetPassword',[AuthController::class,'resetPassword']);
Route::get('usluge', [UslugaController::class, 'index']);
Route::resource('tipovi_usluga', TipUslugeController::class, ['only' => ['index', 'show']]);

Route::group(['middleware' => ['auth:sanctum']], function () {

    
    Route::get('usluge/{id}', [UslugaController::class, 'show']); 
    Route::post('usluge/okaciOglasZaProdaju', [UslugaController::class, 'okaciOglasZaProdaju']);
    Route::post('usluge/kupiUsluguNaOglasu/{id}', [UslugaController::class, 'kupiUsluguNaOglasu']);
    Route::put('usluge/{id}', [UslugaController::class, 'update']); 
    Route::patch('usluge/izmeniCenu/{id}', [UslugaController::class, 'updateCenu']);
    Route::delete('usluge/{id}', [UslugaController::class, 'destroy']);

    //ruta za gledanje kesiranih usluga
   Route::get('/cached-usluge', [UslugaController::class, 'showCachedUsluge']);
    
   Route::get('users', [UserController::class, 'index']);
   
    Route::post('logout', [AuthController::class, 'logout']);

});

