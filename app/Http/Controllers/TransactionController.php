<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TransactionController extends Controller
{
    public function transaction()
    {

        return Inertia::render('Transaction/Transaction');
    }

    public function getDeposit()
    {

        $deposit = Transaction::where('transaction_type', 'Deposit')
                ->with(['user:id,name,email', 'wallet:id,wallet_no'])
                ->latest()
                ->get();

        return response()->json($deposit);
    }

    public function getWithdraw()
    {

        $withdraw = Transaction::where('transaction_type', 'Withdrawal')
                ->whereNot('status', 'processing')
                ->with(['user:id,name,email', 'wallet:id,wallet_no'])
                ->latest()
                ->get();

        return response()->json($withdraw);
    }
}
