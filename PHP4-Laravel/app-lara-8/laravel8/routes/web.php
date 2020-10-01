<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PagesController;
use App\Http\Controllers\ArticlesController;
//use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\SessionsController;
use App\Http\Controllers\UserController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [PagesController::class, 'index']);
Route::get('/contact-us', [PagesController::class, 'contact']);
Route::get('/about', [PagesController::class, 'about']);

Route::get('/articles', [ArticlesController::class, 'index']);
Route::get('/article/{article}', [ArticlesController::class, 'show']);

Route::get('/articles/create', [ArticlesController::class, 'create'])->middleware('admin');
Route::post('/articles/create', [ArticlesController::class, 'store'])->middleware('admin');

Route::get('/article/{article}/edit', [ArticlesController::class, 'edit'])->middleware('auth');;
Route::patch('/article/{article}/edit', [ArticlesController::class, 'update'])->middleware('auth');;
Route::delete('article/{article}/delete', [ArticlesController::class, 'destroy'])->middleware('auth');;

// Auth
//Route::get('/register', [RegisterController::class, 'index'])->name('register')->middleware('guest');;
//Route::post('/register', [RegisterController::class, 'create'])->middleware('guest');;
//Route::get('/login', [SessionsController::class, 'index'])->name('login')->middleware('guest');;
//Route::post('/login', [SessionsController::class, 'authenticate'])->middleware('guest');;
//Route::post('/logout', [SessionsController::class, 'logout'])->name('logout')->middleware('auth');;
// profile
Route::get('/profile', [UserController::class, 'index'])->name('profile')->middleware('auth');;



Route::middleware(['auth:sanctum', 'verified'])->get('/dashboard', function () {
    return Inertia\Inertia::render('Dashboard');
})->name('dashboard');
