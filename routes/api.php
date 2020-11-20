<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Movie;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/*Route::get('/movies', App\Http\Controllers\MovieController::class.'@index');
Route::post('/movies', App\Http\Controllers\MovieController::class.'@store');
Route::put('/movies', App\Http\Controllers\MovieController::class.'@update');
Route::delete('/movies', App\Http\Controllers\MovieController::class.'@destroy');*/
Route::prefix('v1')->group(function () {
    Route::apiResource('Movies', App\Http\Controllers\MovieController::class);
    Route::get('/movies/search', App\Http\Controllers\MovieController::class.'@search');
    Route::get('/movies/sort', App\Http\Controllers\MovieController::class.'@sort');
    Route::get('/movies/wiki', App\Http\Controllers\MovieController::class.'@showwiki');
});

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
