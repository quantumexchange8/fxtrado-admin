<?php

namespace App\Http\Controllers;

use App\Models\GroupSymbol;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SpreadController extends Controller
{
    public function spread()
    {

        return Inertia::render('Spread/Spread');
    }

    public function getSpread()
    {

        $spread = GroupSymbol::where('status', 'active')->get();

        return response()->json($spread);
    }

    public function updateSpread(Request $request)
    {

        $request->validate([
            'spread' => ['required', 'regex:/^-?\d+$/'], // Ensures spread is an integer with no decimal places
        ]);

        $spread = GroupSymbol::find($request->id);

        $spread->spread = $request->spread;
        $spread->save();



        return redirect()->back();
    }

    public function updateSpreadStatus(Request $request)
    {

        // dd($request->all());

        return redirect()->back();
    }
}
