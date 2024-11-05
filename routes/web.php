<?php

use App\Http\Controllers\MemberController;
use App\Http\Controllers\OpenController;
use App\Http\Controllers\PendingController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SpreadController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\WalletController;
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
     *           Member Listing
     * ==============================
     */
    Route::get('/member-listing', [MemberController::class, 'memberListing'])->name('member-listing');
    Route::get('/getMemberListing', [MemberController::class, 'getMemberListing'])->name('getMemberListing');
    Route::get('/member-details/{id}', [MemberController::class, 'memberDetails'])->name('memberDetails');
    Route::post('/changePassword', [MemberController::class, 'changePassword'])->name('changePassword');
    Route::get('/getMemberWallet', [MemberController::class, 'getMemberWallet'])->name('getMemberWallet');

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
     *           Transaction
     * ==============================
     */
    Route::get('/transaction', [TransactionController::class, 'transaction'])->name('transaction');
    Route::get('/getDeposit', [TransactionController::class, 'getDeposit'])->name('getDeposit');
    Route::get('/getWithdraw', [TransactionController::class, 'getWithdraw'])->name('getWithdraw');
    
    /**
     * ==============================
     *           Orders
     * ==============================
     */

     Route::get('/orders', [OpenController::class, 'orders'])->name('orders');

     /**
     * ==============================
     *           Wallet
     * ==============================
     */
    Route::post('/walletAdjustment', [WalletController::class, 'walletAdjustment'])->name('walletAdjustment');

    /**
     * ==============================
     *          Spread Adjustment
     * ==============================
     */
    Route::get('/spread-adjustment', [SpreadController::class, 'spread'])->name('spread');
    Route::get('/getSpread', [SpreadController::class, 'getSpread'])->name('getSpread');
    Route::post('/updateSpread', [SpreadController::class, 'updateSpread'])->name('updateSpread');
    
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
