<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class WalletController extends Controller
{
    public function walletAdjustment(Request $request)
    {

        // dd($request->all());

        return redirect()->back();
    }
}
