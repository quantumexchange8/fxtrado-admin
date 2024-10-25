<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
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

        $pendings = Transaction::where('transaction_type', 'Withdrawal')->where('status', 'processing')->get();

        return response()->json($pendings);
    }
}
