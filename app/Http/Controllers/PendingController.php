<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Models\User;
use App\Models\Wallet;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PendingController extends Controller
{
    public function pending()
    {

        return Inertia::render('Pending/Pending');
    }

    public function getPendingData()
    {

        $pendings = Transaction::where('transaction_type', 'Withdrawal')
                    ->where('status', 'processing')
                    ->with('user:id,name,email')
                    ->get();

        return response()->json($pendings);
    }

    public function approveWithdrawal(Request $request)
    {

        $request->validate([
            'wallet_address' => 'required|string',
            'txid' => 'required|string',
        ]);

        $checkTxid = Transaction::where('txid', $request->txid)->first();
        $transaction = Transaction::find($request->transaction_id);
        $userWallet = Wallet::where('user_id', $transaction->user_id);

        if ($checkTxid) {
            return redirect()->back()->withErrors(['errors', 'Try again later.']);
        }

        $transaction->update([
            'from_wallet' => $request->wallet_address,
            'txid' => $request->txid,
            'approved_at' => now(),
            'status' => 'success',
        ]);

        return redirect()->back();
    }

    public function rejectWithdrawal(Request $request)
    {

        $request->validate([
            'remark' => 'required|string',
        ]);

        $transaction = Transaction::find($request->id);
        $wallet = Wallet::where('user_id', $transaction->user_id)->first();

        $wallet->balance += $transaction->amount;
        $wallet->save();

        $transaction->update([
            'remark' => $request->remark,
            'status' => 'rejected',
            'approved_at' => now(),
        ]);

        return redirect()->back();
    }
}
