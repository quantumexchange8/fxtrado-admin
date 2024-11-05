<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class OpenController extends Controller
{
    public function orders()
    {

        

        return Inertia::render('Orders/Orders');
    }
}
