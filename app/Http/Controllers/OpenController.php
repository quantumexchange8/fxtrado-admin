<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OpenController extends Controller
{
    public function orders()
    {

        

        return Inertia::render('Orders/Orders');
    }

    public function getOrder()
    {

        $order = Order::where('status', 'open')->latest()->get();

        return response()->json($order);
    }
}
