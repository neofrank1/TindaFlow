<?php

use App\Http\Controllers\SuperadminLoginController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::middleware('guest')->group(function () {
    Route::get('superadmin/login', [SuperadminLoginController::class, 'create'])->name('superadmin.login');
    Route::post('superadmin/login', [SuperadminLoginController::class, 'store'])->middleware('throttle:5,1')->name('superadmin.login.store');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

Route::middleware(['auth', 'verified', 'superadmin'])->group(function () {
    Route::inertia('superadmin', 'superadmin')->name('superadmin');
});

require __DIR__.'/settings.php';
