<?php

use App\Http\Controllers\PendingController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect()->route('login');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {

    /**
     * ==============================
     *           Pending
     * ==============================
     */
    Route::get('/pending', [PendingController::class, 'pending'])->name('pending');
    Route::get('/getPendingData', [PendingController::class, 'getPendingData'])->name('getPendingData');
    Route::post('/approveWithdrawal', [PendingController::class, 'approveWithdrawal'])->name('approveWithdrawal');
    Route::post('/rejectWithdrawal', [PendingController::class, 'rejectWithdrawal'])->name('rejectWithdrawal');


    /**
     * ==============================
     *           Profile
     * ==============================
     */

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
