<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Wallet;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WalletController extends Controller
{
    public function walletAdjustment(Request $request)
    {

        $request->validate([
            'wallet_type' => ['required'],
            'amount' => ['required'],
        ]);

        $wallet = Wallet::find($request->wallet_id);

        if ($request->wallet_type === 'balance_in') {
            $wallet->balance += $request->amount;
            $wallet->save();
        } 

        if ($request->wallet_type === 'balance_out') {
            $wallet->balance -= $request->amount;
            $wallet->save();
        } 

        return redirect()->back();
    }
}
