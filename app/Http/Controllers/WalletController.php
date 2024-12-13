<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Models\User;
use App\Models\Wallet;
use App\Services\RunningNumberService;
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

            $transaction = Transaction::create([
                'user_id' => $request->user_id,
                'transaction_number' => RunningNumberService::getID('transaction'),
                'transaction_type' => 'Deposit',
                'amount' => $request->amount,
                'remark' => $request->remark,
                'status' => 'successful',
            ]);
        } 

        if ($request->wallet_type === 'balance_out') {
            $wallet->balance -= $request->amount;
            $wallet->save();

            $transaction = Transaction::create([
                'user_id' => $request->user_id,
                'transaction_number' => RunningNumberService::getID('transaction'),
                'transaction_type' => 'Withdrawal',
                'amount' => $request->amount,
                'remark' => $request->remark,
                'status' => 'successful',
            ]);
        } 

        return redirect()->back();
    }
}
